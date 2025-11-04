import { Box, useMediaQuery } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../shared/lib/i18n';
import { useGetMediaPathQuery, useGetNationsQuery, useGetVehicleTypesQuery, useGetVehiclesQuery } from '../../shared/api/services';
import { FiltersPanel } from '../../widgets/filters-panel/FiltersPanel';
import { ShipCard } from '../../entities/ship/ui/ShipCard';
import { Vehicle } from '../../entities/ship/model/types';
import { useDebouncedValue } from '../../shared/lib/debounce';
import { PaginationBar } from '../../shared/ui/PaginationBar';
import { ShipCardSkeleton } from '../../shared/ui/Skeletons';
import { Header } from '../../widgets/header/Header';
import s from './ShipsListPage.module.scss';
import { UI } from '../../shared/config/constants';

const PAGE_SIZE_MOBILE_TABLET = 8;
const PAGE_SIZE_DESKTOP = 9;


export const ShipsListPage = () => {
  const { t } = useTranslation('ui');
  const lang = (localStorage.getItem('lang') || i18n.language || 'ru') as string;

  const isDesktop = useMediaQuery('(min-width:1268px)');

  const { data: mp,       isFetching: mpFetching }       = useGetMediaPathQuery({ lang });
  const { data: nations,  isFetching: nationsFetching }  = useGetNationsQuery({ lang });
  const { data: types,    isFetching: typesFetching }    = useGetVehicleTypesQuery({ lang });
  const { data: vehicles, isFetching: vehiclesFetching } = useGetVehiclesQuery({ lang });

  const isLoading = mpFetching || nationsFetching || typesFetching || vehiclesFetching;

  const media = mp?.data ?? '';
  const all = useMemo<Vehicle[]>(() => (vehicles ? Object.values(vehicles.data) : []), [vehicles]);

  const [levels, setLevels] = useState<[number,number]>([1,11]);
  const [selNations, setSelNations] = useState<string[]>([]);
  const [selTypes, setSelTypes]     = useState<string[]>([]);
  const [search, setSearch]         = useState('');
  const debouncedSearch = useDebouncedValue(search, UI.DEBOUNCE_MS);

  // константы
  const ALL_LEVELS: [number, number] = [1, 11];

  // мемоизируем множества
  const nationSet = useMemo(() => new Set(selNations), [selNations]);
  const typeSet   = useMemo(() => new Set(selTypes),   [selTypes]);

  const filtered = useMemo(() => {
    const [minL, maxL] = levels;

    const hasNation = selNations.length > 0;
    const hasType   = selTypes.length  > 0;
    const q         = debouncedSearch.trim().toLowerCase();
    const hasQuery  = q.length > 0;

    // если вообще нет фильтров — только уровень и сортировка
    if (!hasNation && !hasType && !hasQuery && levels[0] === ALL_LEVELS[0] && levels[1] === ALL_LEVELS[1]) {
      return [...all].sort((a, b) => a.level - b.level);
    }

    const res: Vehicle[] = [];
    for (const v of all) {
      if (v.level < minL || v.level > maxL) continue;
      if (hasNation && !nationSet.has(v.nation)) continue;
      if (hasType && !v.tags?.some(t => typeSet.has(t))) continue;

      if (hasQuery) {
        const mark = v.localization?.mark?.[lang] || v.localization?.mark?.en || v.name;
        if (!String(mark).toLowerCase().includes(q)) continue;
      }

      res.push(v);
    }

    res.sort((a, b) => a.level - b.level);
    return res;
  }, [all, levels, nationSet, typeSet, selNations.length, selTypes.length, debouncedSearch, lang]);

  const [page, setPage] = useState(1);
  useEffect(() => { setPage(1); }, [levels, selNations, selTypes, debouncedSearch]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);

  const PAGE_SIZE = isDesktop ? PAGE_SIZE_DESKTOP : PAGE_SIZE_MOBILE_TABLET;
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  const nationOptions = useMemo(
    () => (nations?.data ?? []).map(n => ({ code: n.name, label: n.localization.mark[lang] || n.name })),
    [nations, lang]
  );
  const typeOptions = useMemo(() => {
    const d = types?.data ?? {};
    return Object.keys(d).map(k => ({ code: k, label: d[k].localization?.mark?.[lang] || k }));
  }, [types, lang]);

  useEffect(() => { document.title = `WoW Ships — ${filtered.length}`; }, [filtered.length]);

  const mobileFilters = (
    <FiltersPanel
      variant="stack"
      levels={levels}        
      onLevels={setLevels}
      nations={nationOptions} 
      selectedNations={selNations} 
      onNations={setSelNations}
      types={typeOptions}     
      selectedTypes={selTypes}     
      onTypes={setSelTypes}
      search={search}         
      onSearch={setSearch}
      labels={{ 
        levels: t('levels'), 
        nations: t('nations'), 
        types: t('types'), 
        search: t('search') 
      }}
    />
  );

  return (
    <>
      <Header mobileContent={mobileFilters} />

      <Box className={s.desktopFilters}>
        <FiltersPanel
          variant="grid"
          levels={levels}        
          onLevels={setLevels}
          nations={nationOptions} 
          selectedNations={selNations} 
          onNations={setSelNations}
          types={typeOptions}     
          selectedTypes={selTypes}     
          onTypes={setSelTypes}
          search={search}         
          onSearch={setSearch}
          labels={{ 
            levels: t('levels'), 
            nations: t('nations'), 
            types: t('types'), 
            search: t('search') }}
          sxTitleFix={{ 
            position: 'relative', 
            zIndex: 2 
          }}
        />
      </Box>

      {isLoading ? (
        <Box className={s.grid}>
          {Array.from({ length: PAGE_SIZE }).map((_, i) => <ShipCardSkeleton key={i} />)}
        </Box>
      ) : (
        <>
          <Box className={s.grid}>
            {paged.map(ship => <ShipCard key={ship.name} media={media} ship={ship} />)}
          </Box>

          {filtered.length === 0 && (
            <Box className={s.emptyWrap}>
              <p>{t('nothing') ?? 'По вашему запросу ничего не найдено'}</p>
              <button
                className="b b-orange b-focus"
                onClick={() => { setLevels([1,11]); setSelNations([]); setSelTypes([]); setSearch(''); }}
              >
                {t('reset') ?? 'Сбросить фильтры'}
              </button>
            </Box>
          )}

          {filtered.length > 0 && <PaginationBar page={page} pages={pages} onChange={setPage} />}
        </>
      )}
    </>
  );
};