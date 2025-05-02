import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n.ts'
import './index.css'
import { store } from './context/store'
import './i18n.ts'
import { lazy } from 'react'

const App = lazy(() => import('./App.tsx'))

createRoot(document.getElementById('root')!).render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <App />
    </Provider>
  </I18nextProvider>,
)
