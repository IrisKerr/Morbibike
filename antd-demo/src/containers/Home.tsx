// src/routes/Home.tsx
import React from 'react'
import { RootState } from '../store/store'
import { Typography } from 'antd'
import { Bike } from '../components/bike/Bike'
import { useAppSelector } from '../store/hooks'
import RentCalendar from '../components/RentCalendar'

const { Title, Paragraph } = Typography

const Home: React.FC = () => {
  const bikes = useAppSelector((state: RootState) => state.bikes.bikes)
  console.log('vélos du store', bikes)

  const paragraphStyle: React.CSSProperties = {
    fontSize: '16px',
    lineHeight: '1.5',
    maxWidth: '700px',
    margin: '1rem auto',
    padding: '1rem',
  }

  const containerStyle: React.CSSProperties = {
    fontSize: '16px',
    lineHeight: '1.5',
    display: 'flex',
    flexDirection: 'column',
    margin: '4rem auto',
    padding: '1rem',
  }

  const titleStyle: React.CSSProperties = {
    margin: '0.5rem auto',
    padding: '1rem',
    color: '#ff5733',
  }

  const addBikeStyle: React.CSSProperties = {
    marginTop: '5rem',
    backgroundColor: '#FDBF6F66',
    padding: '2rem 0',
    borderRadius: '1rem',
  }

  return (
    <div style={containerStyle}>
      {/* afficher seulement la liste des velos disponibles! */}
      <Title level={3} style={titleStyle}>
        Nos vélos disponibles à la location
      </Title>
      <Paragraph style={paragraphStyle}>
        Jacques Pedalo est un homme passionné, et il n&apos;y a qu&apos;une
        chose qui puisse rivaliser avec son amour pour la Bretagne : ses vélos.
        Il les chérit tellement qu&apos;il les a baptisés en l&apos;honneur de
        sa chère région natale, la Bretagne. Découvrez-les !
      </Paragraph>
      <Bike.ListCard bikes={bikes} />
      <div style={addBikeStyle}>
        <Title level={4} style={titleStyle}>
          Vous n&apos;avez pas trouvé votre bonheur ? <br /> Ajoutez votre
          propre vélo!
        </Title>
        <Bike.AddCard />
      </div>
      <RentCalendar />
    </div>
  )
}

export default Home
