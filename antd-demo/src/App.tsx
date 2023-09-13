import React from 'react';
import { Provider } from 'react-redux';
// imports composants
import AppRoutes from './routes/routes';
import MainLayout from './layouts/MainLayout';
// imports styles CSS
import './App.css';
import './custom-theme.less'
import { store } from './store/store'; 

const App: React.FC = () => (
  <Provider store={store}>
  <MainLayout>
    <AppRoutes /> 
  </MainLayout>
  </Provider>
);

export default App;
