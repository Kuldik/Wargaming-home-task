import React from 'react';
import ReactDOM from 'react-dom/client';
import '../shared/styles/tokens.scss';
import '../shared/styles/globals.scss';

import { StoreProvider } from './providers/StoreProvider';
import { ThemeProviderApp } from './providers/ThemeProvider';
import { I18nProvider } from './providers/I18nProvider';
import { RouterProviderApp } from './providers/RouterProvider';
import { SnackbarProviderApp } from './providers/SnackbarProvider';
import { VideoBackground } from './VideoBackground';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* фоновое видео можно выключить в хедере */}
    <VideoBackground />

    <StoreProvider>
      <I18nProvider>
        <ThemeProviderApp>
          <SnackbarProviderApp>
            <RouterProviderApp />
          </SnackbarProviderApp>
        </ThemeProviderApp>
      </I18nProvider>
    </StoreProvider>
  </React.StrictMode>
);
