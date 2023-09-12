// src/Routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from "../pages/Home"

const AppRoutes: React.FC = () => {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        </Routes>
    </Router>
  );
};

export default AppRoutes;
