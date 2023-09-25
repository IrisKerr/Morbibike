// src/Routes.tsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../components/pages/Home'
import MainLayout from '../layouts/MainLayout'
import Bike from '../components/pages/Bike'

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/bike/:id" element={<Bike />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
