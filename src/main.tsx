import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.ts';
import './index.css';
import './i18n.ts';
import { lazy } from 'react';
import { SettingsProvider } from './context/settingContext.tsx';

const App = lazy(() => import('./App.tsx'));

createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18n}>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </I18nextProvider>
);
