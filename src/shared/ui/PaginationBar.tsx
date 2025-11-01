import { Pagination, Stack } from '@mui/material';

export const PaginationBar: React.FC<{
  page: number;
  pages: number;
  onChange: (page: number) => void;
}> = ({ page, pages, onChange }) => (
  <Stack alignItems="center" sx={{ p: 2 }}>
    <Pagination count={pages} page={page} onChange={(_, p) => onChange(p)} />
  </Stack>
);
