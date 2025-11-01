import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Slider, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  levels: [number, number];
  onLevels: (v:[number,number]) => void;
  nations: { code: string; label: string; icon?: string }[];
  selectedNations: string[];
  onNations: (arr: string[]) => void;
  types: { code: string; label: string; icon?: string }[];
  selectedTypes: string[];
  onTypes: (arr: string[]) => void;
  search: string;
  onSearch: (s: string) => void;
};

export const FiltersPanel = (p: Props) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: '1fr 1fr 1fr 2fr', p: 2, borderBottom: '1px solid var(--border)', background: 'var(--panel)' }}>
      <Box>
        <span>Уровень</span>
        <Slider value={p.levels} onChange={(_, v) => p.onLevels(v as [number,number])} valueLabelDisplay="auto" min={1} max={11}/>
      </Box>

      <FormControl>
        <InputLabel>Нации</InputLabel>
        <Select multiple value={p.selectedNations} input={<OutlinedInput label="Нации" />} onChange={(e)=>p.onNations(e.target.value as string[])}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {(selected as string[]).map(v => <Chip size="small" key={v} label={v} />)}
            </Box>
          )}>
          {p.nations.map(n => (
            <MenuItem key={n.code} value={n.code}>
              {n.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Типы</InputLabel>
        <Select multiple value={p.selectedTypes} input={<OutlinedInput label="Типы" />} onChange={(e)=>p.onTypes(e.target.value as string[])}
          renderValue={(selected) => <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>{(selected as string[]).map(v => <Chip size="small" key={v} label={v}/>)}</Box>}>
          {p.types.map(ti => <MenuItem key={ti.code} value={ti.code}>{ti.label}</MenuItem>)}
        </Select>
      </FormControl>

      <TextField
        placeholder={t('search')}
        value={p.search}
        onChange={(e)=>p.onSearch(e.target.value)}
        InputProps={{
          startAdornment: <span style={{ opacity:.6, marginRight:8 }} aria-hidden>🔎</span>,
          sx: { backdropFilter: 'blur(10px)' }
        }}
      />
    </Box>
  );
};
