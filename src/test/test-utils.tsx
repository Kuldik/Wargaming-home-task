import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { ThemeProviderApp } from '../app/providers/ThemeProvider';
import { I18nProvider } from '../app/providers/I18nProvider';

// Рендер с провайдерами темы и i18n
export function renderWithProviders(ui: ReactElement) {
  return render(
    <I18nProvider>
      <ThemeProviderApp>{ui}</ThemeProviderApp>
    </I18nProvider>
  );
}
