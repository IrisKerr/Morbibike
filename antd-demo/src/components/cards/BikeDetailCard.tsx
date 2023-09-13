import React from 'react';
import { Card, Button } from 'antd';

import DeleteBikeButton from '../buttons/DeleteBikeButton';
import EditBikeButton from '../buttons/EditBikeButton';
import { Velo } from '../../models/types';

interface BikeDetailCardProps {
  bike: Velo; // Utilisez une seule instance de Velo pour afficher les détails d'un vélo spécifique
}

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '0.5rem',
};

const cardStyle: React.CSSProperties = {
  width: '300px',
  margin: '4rem auto',  
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', 
};

const BikeDetailCard: React.FC<BikeDetailCardProps> = ({bike}) => {
  return (
    <>
    <Card
          key={bike.id}
          title={bike.name}
         
          style={cardStyle}
        >
          <p>Modèle: {bike.model}</p>
          <p>Année: {bike.year}</p>
          <p>Type de vélo: {bike.bikeType}</p>
          <p>Couleur: {bike.color}</p>
          <div style={buttonContainerStyle}>
          <EditBikeButton />
          <DeleteBikeButton />
          </div>
        </Card>
    </>
         
  );
};

export default BikeDetailCard;
