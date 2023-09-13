import React from 'react'
import { useParams } from 'react-router-dom'; 
import BikeDetailCard from "../components/BikeDetailCard"
import { initialBikes } from "../data/initialData"
import { Velo } from '../models/types';

const BikeDetailContainer: React.FC = () => {
    // Utilisez useParams() pour extraire l'ID du vélo à partir de l'URL
    const { id } = useParams<{ id?: string }>();

    if (typeof id === 'undefined') {
        return <div>Identifiant de vélo non spécifié</div>;
      }
    
      const bikeId = parseInt(id, 10);
    
      const selectedBike: Velo | undefined = initialBikes.find((bike) => bike.id === bikeId);
    
      if (!selectedBike) {
        return <div>Vélo non trouvé</div>;
      }
    
      return (
        <div>
          <h1>Détails du vélo</h1>
          <BikeDetailCard bike={selectedBike} />
        </div>
      );
    };
    
  
  export default BikeDetailContainer;
  
  
  
  

  