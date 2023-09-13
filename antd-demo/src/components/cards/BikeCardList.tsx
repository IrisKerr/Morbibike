import React from 'react';
import { Card, Button, Row, Col  } from 'antd';
import { Link } from 'react-router-dom';
import { Velo } from '../../models/types';


interface BikeListProps {
  bikes: Velo[];
//   onEditClick: (bike: Velo) => void; // Callback pour gérer l'édition d'un vélo
}

const buttonStyle: React.CSSProperties = {
    backgroundColor: '#FF5733',
    borderColor: '#FF5733',
    color: '#FFFFFF',
  };

  const cardStyle: React.CSSProperties = {
    width: '300px',
    margin: '16px',  
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', 
  };

const BikeList: React.FC<BikeListProps> = ({ bikes}) => {


  return (
    <div>
         <Row gutter={16} justify="center"> 
      {bikes.map((bike) => (
         <Col md={12} lg={8} key={bike.id}>
        <Card
          key={bike.id}
          title={bike.name}
          style={cardStyle}
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
