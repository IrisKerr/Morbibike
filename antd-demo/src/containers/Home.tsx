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
    margin: '2rem auto',
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
    margin: '5rem 0 1.5rem 0',
    padding: '1rem',
  }

  return (
    <div style={containerStyle}>
      {/* afficher seulement la liste des velos disponibles! */}
      <Title level={3}>Nos vélos disponibles à la location</Title>
      <Paragraph style={paragraphStyle}>
        Jacques Pedalo est un homme passionné, et il n&apos;y a qu&apos;une
        chose qui puisse rivaliser avec son amour pour la Bretagne : ses vélos.
        Il les chérit tellement qu&apos;il les a baptisés en l&apos;honneur de
        sa chère région natale, la Bretagne. Découvrez-les !
      </Paragraph>
      <Bike.ListCard bikes={bikes} />
      <Title level={4} style={titleStyle}>
        Vous n&apos;avez pas trouvé votre bonheur ? Ajoutez votre propre vélo!
      </Title>
      <Bike.AddCard />
      <RentCalendar />
    </div>
  )
}

export default Home
