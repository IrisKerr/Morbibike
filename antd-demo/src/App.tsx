import React from 'react'
import { Provider } from 'react-redux'
import { DarkModeProvider } from './contexts/DarkModeContext'
// imports composant routes
import AppRoutes from './routes/routes'

// imports styles et store
import './App.css'
import './index.css'
import './custom-theme.less'
import './dark-theme.less'
import { store } from './store/store'

const App: React.FC = () => (
  <Provider store={store}>
    <DarkModeProvider>
      <AppRoutes />
    </DarkModeProvider>
  </Provider>
)

export default App
