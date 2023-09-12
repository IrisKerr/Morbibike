import React from 'react';

import AppRoutes from './routes/routes';
import { ConfigProvider, theme } from 'antd';
import './App.css';
import './custom-theme.less'

function App() {
  return (
    
  //   <ConfigProvider
  //   theme={{
  //     algorithm: theme.darkAlgorithm,
  //   }}
  // >
    <div className="App">
      <AppRoutes />

    </div>
    // </ConfigProvider>
  );
}

export default App;
