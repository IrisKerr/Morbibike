import React from 'react';
// imports composants
import AppRoutes from './routes/routes';
import MainLayout from './layouts/MainLayout';
// imports styles CSS
import './App.css';
import './custom-theme.less'

const App: React.FC = () => (
  <MainLayout>
    <AppRoutes /> 
  </MainLayout>
);

export default App;
