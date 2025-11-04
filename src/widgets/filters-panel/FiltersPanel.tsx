import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  TextField,
  InputAdornment,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

type Opt = { code: string; label: string; icon?: string };

export type FiltersPanelProps = {
  levels: [number, number];
  onLevels: (v: [number, number]) => void;

  nations: Opt[];
  selectedNations: string[];
  onNations: (arr: string[]) => void;

  types: Opt[];
  selectedTypes: string[];
  onTypes: (arr: string[]) => void;

  search: string;
  onSearch: (s: string) => void;

  labels: { levels: string; nations: string; types: string; search: string };

  variant?: 'grid' | 'stack';

  searchClassName?: string;

  sxTitleFix?: SxProps<Theme>;

  sx?: SxProps<Theme>;
};

const CONTROL_H = 55; // единая высота всех инпутов

export const FiltersPanel = (p: FiltersPanelProps) => {
  const { variant = 'grid', sx, searchClassName } = p;

  const nationMap = new Map(p.nations.map((n) => [n.code, n.label]));
  const typeMap   = new Map(p.types.map((t) => [t.code, t.label]));
  const isStack   = variant === 'stack';

  const chip = (text: string) => <Chip size="small" key={text} label={text} />;

  // Базовый стиль для Select (через OutlinedInput)
  const selectRootSx: SxProps<Theme> = {
    color: 'var(--text)',
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'var(--panel)',
      height: `${CONTROL_H}px`,          // фиксированная высота инпута
      borderRadius: '12px',
      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },

      // контейнер видимой области (тут делаем скролл)
      '& .MuiSelect-select': {
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        gap: '6px',
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '12px',
        paddingRight: '36px',
        height: `${CONTROL_H}px`,
        lineHeight: 'normal',
        overflowY: 'auto',
        whiteSpace: 'normal',
        // опционально: тонкий скролл
        '&::-webkit-scrollbar': { width: 6, height: 6 },
        '&::-webkit-scrollbar-thumb': { background: 'var(--border)', borderRadius: 8 },
      },
    },
    '& .MuiFormLabel-root': { color: 'var(--text)' },
    '& .MuiSvgIcon-root':  { color: 'var(--text)' },
  };

  const menuPaperSx: SxProps<Theme> = {
    backgroundColor: 'var(--panel)',
    color: 'var(--text)',
    border: '1px solid var(--border)',
    backdropFilter: 'blur(8px)',
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: isStack ? '1fr' : '1fr 1fr 1fr 2fr',
        p: isStack ? 0 : 2,
        maxHeight: '90px',
        borderBottom: isStack ? 'none' : '1px solid var(--border)',
        background: isStack ? 'transparent' : 'var(--panel)',
        ...sx,
      }}
    >
      {/* Уровень */}
      <Box sx={{ height: 'fit-content' }}>
        <Box sx={{ mb: 1, fontSize: 14, color: 'var(--text)', ...p.sxTitleFix }}>
          {p.labels.levels}
        </Box>
        <Box
          sx={{
            position: 'relative',
            '@media (min-width: 768px)': { bottom: '10px' }, 
          }}
        >
          <Slider
            value={p.levels}
            onChange={(_, v) => p.onLevels(v as [number, number])}
            valueLabelDisplay="auto"
            min={1}
            max={11}
          />
        </Box>
      </Box>

      {/* Нации */}
      <FormControl fullWidth sx={selectRootSx}>
        <InputLabel sx={{ color: 'var(--text)' }}>{p.labels.nations}</InputLabel>
        <Select
          multiple
          size="small"
          label={p.labels.nations}
          value={p.selectedNations}
          input={<OutlinedInput label={p.labels.nations} />}
          onChange={(e) => p.onNations(e.target.value as string[])}
          renderValue={(selected) => (
            <Box
              sx={{
                display: 'flex',
                gap: 0.5,
                flexWrap: 'wrap',
                alignContent: 'flex-start',
                maxHeight: `calc(${CONTROL_H}px)`, 
                overflowY: 'auto',
                pr: 1, 
              }}
            >
              {(selected as string[]).map((code) => chip(nationMap.get(code) ?? code))}
            </Box>
          )}
          MenuProps={{ PaperProps: { sx: menuPaperSx } }}
        >
          {p.nations.map((n) => (
            <MenuItem key={n.code} value={n.code}>
              {n.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Типы */}
      <FormControl fullWidth sx={selectRootSx}>
        <InputLabel sx={{ color: 'var(--text)' }}>{p.labels.types}</InputLabel>
        <Select
          multiple
          size="small"
          label={p.labels.types}
          value={p.selectedTypes}
          input={<OutlinedInput label={p.labels.types} />}
          onChange={(e) => p.onTypes(e.target.value as string[])}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {(selected as string[]).map((code) => chip(typeMap.get(code) ?? code))}
            </Box>
          )}
          MenuProps={{ PaperProps: { sx: menuPaperSx } }}
        >
          {p.types.map((ti) => (
            <MenuItem key={ti.code} value={ti.code}>
              {ti.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Поиск */}
      <TextField
        className={searchClassName}
        fullWidth
        size="small"
        placeholder={p.labels.search}
        value={p.search}
        onChange={(e) => p.onSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <span aria-hidden style={{ opacity: 0.6, display: 'inline-block', marginLeft: 2 }}>🔎</span>
            </InputAdornment>
          ),
          sx: {
            height: 'fit-content',
            minHeight: `${CONTROL_H}px`,
            backgroundColor: 'var(--panel)',
            borderRadius: '12px',
            color: 'var(--text)',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
            '& input::placeholder': { color: 'var(--text)', opacity: 0.55 },
          },
        }}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border)' },
          '& .MuiInputBase-root': {
            // сам корень инпута
            height: 'fit-content',
            minHeight: `${CONTROL_H}px`,
          },
        }}
      />
    </Box>
  );
};
