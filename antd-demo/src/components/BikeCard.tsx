import React from 'react';
import { Card, Button, Row, Col  } from 'antd';
import { Link } from 'react-router-dom';
import { Velo } from '../models/types';

interface BikeListProps {
  bikes: Velo[];
//   onEditClick: (bike: Velo) => void; // Callback pour gérer l'édition d'un vélo
}

const buttonStyle: React.CSSProperties = {
    backgroundColor: '#FF5733',
    borderColor: '#FF5733',
    color: '#FFFFFF',
  };

const BikeList: React.FC<BikeListProps> = ({ bikes}) => {

  return (
    <div>
         <Row gutter={16}> 
      {bikes.map((bike) => (
         <Col span={8} key={bike.id}>
        <Card
          key={bike.id}
          title={bike.name}
          style={{ width: 300, margin: '16px' }}
        ><Link to={`/bike/${bike.id}`}>
        <Button type="primary" style={buttonStyle}>Voir détails</Button>
      </Link>
         
        </Card>
        </Col>
      ))}
      </Row>
    </div>
  );
};

export default BikeList;
