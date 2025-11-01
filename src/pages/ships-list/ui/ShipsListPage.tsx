import { Box, CircularProgress } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import i18n from '../../../shared/lib/i18n';
import { useGetMediaPathQuery, useGetNationsQuery, useGetVehicleTypesQuery, useGetVehiclesQuery } from '../../../shared/api/services';
import { FiltersPanel } from '../../../widgets/filters-panel/ui/FiltersPanel';
import { ShipCard } from '../../../entities/ship/ui/ShipCard';
import { Vehicle } from '../../../entities/ship/model/types';
import { useDebouncedValue } from '../../../shared/lib/debounce';
import { PaginationBar } from '../../../shared/ui/PaginationBar';

const PAGE_SIZE = 9;

export const ShipsListPage = () => {
  const lang = (localStorage.getItem('lang') || i18n.language || 'ru') as string;

  const { data: mp } = useGetMediaPathQuery({ lang });
  const { data: nations } = useGetNationsQuery({ lang });
  const { data: types } = useGetVehicleTypesQuery({ lang });
  const { data: vehiclesResp, isLoading } = useGetVehiclesQuery({ lang });

  const media = mp?.data ?? '';
  const all = useMemo<Vehicle[]>(() => vehiclesResp ? Object.values(vehiclesResp.data) : [], [vehiclesResp]);

  // фильтры
  const [levels, setLevels] = useState<[number,number]>([1,11]);
  const [selNations, setSelNations] = useState<string[]>([]);
  const [selTypes, setSelTypes] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 300);

  const filtered = useMemo(() => {
    const nationSet = new Set(selNations);
    const typeSet = new Set(selTypes);
    return all
      .filter(v => v.level>=levels[0] && v.level<=levels[1])
      .filter(v => selNations.length ? nationSet.has(v.nation) : true)
      .filter(v => selTypes.length ? v.tags.some(t => typeSet.has(t)) : true)
      .filter(v => {
        if (!debouncedSearch) return true;
        const mark = v.localization?.mark?.[lang] || v.localization?.mark?.en || v.name;
        return mark.toLowerCase().includes(debouncedSearch.toLowerCase());
      })
      .sort((a,b) => a.level - b.level);
  }, [all, levels, selNations, selTypes, debouncedSearch, lang]);

  // пагинация
  const [page, setPage] = useState(1);
  useEffect(() => { setPage(1); }, [levels, selNations, selTypes, debouncedSearch]); // сбрасывать страницу при смене фильтров
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  const nationOptions = useMemo(() =>
    (nations?.data ?? []).map(n => ({ code: n.name, label: n.localization.mark[lang] || n.name })), [nations, lang]);

  const typeOptions = useMemo(() => {
    const d = types?.data ?? {};
    return Object.keys(d).map(k => ({ code: k, label: d[k].localization.mark[lang] || k }));
  }, [types, lang]);

  useEffect(()=> { document.title = `WoWS Ships — ${filtered.length}`; }, [filtered.length]);

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>
      <FiltersPanel
        levels={levels} onLevels={setLevels}
        nations={nationOptions} selectedNations={selNations} onNations={setSelNations}
        types={typeOptions} selectedTypes={selTypes} onTypes={setSelTypes}
        search={search} onSearch={setSearch}
      />

      {isLoading ? (
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}><CircularProgress/></Box>
      ) : (
        <>
          {/* Грид 3х карточек на десктопе */}
          <Box sx={{
            display: 'grid',
            gap: 16,
            padding: 16,
            gridTemplateColumns: '1fr',
            '@media (min-width: 900px)': { gridTemplateColumns: 'repeat(3, 1fr)' }
          }}>
            {paged.map(ship => <ShipCard key={ship.name} media={media} ship={ship} />)}
          </Box>

          {filtered.length === 0 && (
            <Box sx={{ p:4, textAlign: 'center' }}>
              <p>По вашему запросу ничего не найдено</p>
              <button className="b b-orange b-focus" onClick={()=>{ setLevels([1,11]); setSelNations([]); setSelTypes([]); setSearch(''); }}>Сбросить фильтры</button>
            </Box>
          )}

          {filtered.length > 0 && <PaginationBar page={page} pages={pages} onChange={setPage} />}
        </>
      )}
    </Box>
  );
};
