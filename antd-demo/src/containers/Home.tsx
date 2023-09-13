// src/routes/Home.tsx
import React from 'react';
import { initialBikes } from "../data/initialData"
import BikeList from '../components/BikeCard';
import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.5',
    maxWidth: '700px',
    margin: '2rem auto',
  };

  return (
    <div>
  {/* afficher seulement la liste des velos disponibles! */}
      <Title level={3}>Nos vélos disponibles à la location</Title>
      <Paragraph style={paragraphStyle}>Jacques Pedalo est un homme passionné, et il n'y a qu'une chose qui puisse rivaliser avec son amour pour la Bretagne : ses vélos. Il les chérit tellement qu'il les a baptisés en l'honneur de sa chère région natale, la Bretagne.</Paragraph>
      <BikeList bikes={initialBikes} />
    </div>
  );
};

export default Home;
