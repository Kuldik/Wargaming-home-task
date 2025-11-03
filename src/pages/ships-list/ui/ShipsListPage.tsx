import { Box, useMediaQuery } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../../shared/lib/i18n';
import { useGetMediaPathQuery, useGetNationsQuery, useGetVehicleTypesQuery, useGetVehiclesQuery } from '../../../shared/api/services';
import { FiltersPanel } from '../../../widgets/filters-panel/ui/FiltersPanel';
import { ShipCard } from '../../../entities/ship/ui/ShipCard';
import { Vehicle } from '../../../entities/ship/model/types';
import { useDebouncedValue } from '../../../shared/lib/debounce';
import { PaginationBar } from '../../../shared/ui/PaginationBar';
import { ShipCardSkeleton } from '../../../shared/ui/Skeletons';
import { Header } from '../../../widgets/header/ui/Header';

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

  // фильтры
  const [levels, setLevels] = useState<[number,number]>([1,11]);
  const [selNations, setSelNations] = useState<string[]>([]);
  const [selTypes, setSelTypes]     = useState<string[]>([]);
  const [search, setSearch]         = useState('');
  const debouncedSearch = useDebouncedValue(search, 300);

  const filtered = useMemo(() => {
    const nationSet = new Set(selNations);
    const typeSet   = new Set(selTypes);
    return all
      .filter(v => v.level>=levels[0] && v.level<=levels[1])
      .filter(v => selNations.length ? nationSet.has(v.nation) : true)
      .filter(v => selTypes.length  ? v.tags.some(t => typeSet.has(t)) : true)
      .filter(v => {
        if (!debouncedSearch) return true;
        const mark = v.localization?.mark?.[lang] || v.localization?.mark?.en || v.name;
        return String(mark).toLowerCase().includes(debouncedSearch.toLowerCase());
      })
      .sort((a,b) => a.level - b.level);
  }, [all, levels, selNations, selTypes, debouncedSearch, lang]);

  // пагинация
  const [page, setPage] = useState(1);
  useEffect(() => { setPage(1); }, [levels, selNations, selTypes, debouncedSearch]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);

  const PAGE_SIZE = isDesktop ? PAGE_SIZE_DESKTOP : PAGE_SIZE_MOBILE_TABLET;
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE);

  // опции
  const nationOptions = useMemo(
    () => (nations?.data ?? []).map(n => ({ code: n.name, label: n.localization.mark[lang] || n.name })),
    [nations, lang]
  );
  const typeOptions = useMemo(() => {
    const d = types?.data ?? {};
    return Object.keys(d).map(k => ({ code: k, label: d[k].localization?.mark?.[lang] || k }));
  }, [types, lang]);

  useEffect(() => { document.title = `WoW Ships — ${filtered.length}`; }, [filtered.length]);

  const gridSx = {
    display: 'grid',
    gap: '30px',
    padding: '30px',
    gridTemplateColumns: '1fr',
    '@media (min-width: 768px)':   { gridTemplateColumns: 'repeat(2, 1fr)' },
    '@media (min-width: 1268px)':  { gridTemplateColumns: 'repeat(3, 1fr)', gap: '80px', padding: '80px' },
  } as const;

  const mobileFilters = (
    <FiltersPanel
      variant="stack"
      levels={levels}        onLevels={setLevels}
      nations={nationOptions} selectedNations={selNations} onNations={setSelNations}
      types={typeOptions}     selectedTypes={selTypes}     onTypes={setSelTypes}
      search={search}         onSearch={setSearch}
      labels={{ levels: t('levels'), nations: t('nations'), types: t('types'), search: t('search') }}
    />
  );

  return (
    <>
      <Header mobileContent={mobileFilters} />

      {/* десктопные фильтры под хедером */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <FiltersPanel
          variant="grid"
          levels={levels}        onLevels={setLevels}
          nations={nationOptions} selectedNations={selNations} onNations={setSelNations}
          types={typeOptions}     selectedTypes={selTypes}     onTypes={setSelTypes}
          search={search}         onSearch={setSearch}
          labels={{ levels: t('levels'), nations: t('nations'), types: t('types'), search: t('search') }}
          sxTitleFix={{ position: 'relative', zIndex: 2 }}
        />
      </Box>

      {isLoading ? (
        <Box sx={gridSx}>
          {Array.from({ length: PAGE_SIZE }).map((_, i) => <ShipCardSkeleton key={i} />)}
        </Box>
      ) : (
        <>
          <Box sx={gridSx}>
            {paged.map(ship => <ShipCard key={ship.name} media={media} ship={ship} />)}
          </Box>

          {filtered.length === 0 && (
            <Box sx={{ p:4, textAlign: 'center' }}>
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
