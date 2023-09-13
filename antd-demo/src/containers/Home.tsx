// src/routes/Home.tsx
import React from 'react';
import { initialBikes } from "../data/initialData"
import BikeList from '../components/BikeCard';

const Home: React.FC = () => {
  return (
    <div>
  {/* afficher seulement la liste des velos disponibles! */}
      <h1>Nos vélos disponibles à la location</h1>
      <BikeList bikes={initialBikes} />
    </div>
  );
};

export default Home;
