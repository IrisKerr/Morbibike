import React from 'react';
import { Card, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { Velo } from '../models/types';

interface BikeDetailCardProps {
  bike: Velo; // Utilisez une seule instance de Velo pour afficher les détails d'un vélo spécifique
}

const BikeDetailCard: React.FC<BikeDetailCardProps> = ({bike}) => {
  return (
    <>
    <Card
          key={bike.id}
          title={bike.name}
         
          style={{ width: 300, margin: '16px' }}
        >
          <p>Modèle: {bike.model}</p>
          <p>Année: {bike.year}</p>
          <p>Type de vélo: {bike.bikeType}</p>
          <p>Couleur: {bike.color}</p>
          <Button
              type="primary"
              icon={<EditOutlined />}
            //   onClick={() => onEditClick(bike)}
            style={{ margin: '0 0.2rem' }}
            >
              Modifier
            </Button>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
            //   onClick={() => onEditClick(bike)}
            style={{ margin: '0 0.2rem' }}
            >
              Supprimer
            </Button>
          
        </Card>
    </>
         
  );
};

export default BikeDetailCard;
