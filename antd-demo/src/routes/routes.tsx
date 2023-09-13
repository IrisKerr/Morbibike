// src/Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "../containers/Home"
import BikeDetailContainer from '../containers/BikeDetailContainer';

const AppRoutes: React.FC = () => {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bike/:id" element={<BikeDetailContainer />} />
        </Routes>
    </Router>
  );
};

export default AppRoutes;
