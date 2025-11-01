import { SnackbarProvider } from 'notistack';
export const SnackbarProviderApp: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
    {children}
  </SnackbarProvider>
);
