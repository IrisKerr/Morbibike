// src/routes/Home.tsx
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

// import { initialBikes } from "../data/initialData"
import BikeList from '../components/cards/BikeCardList'
import BikeAddCard from '../components/cards/BikeAddCard'
import { Typography } from 'antd'
const { Title, Paragraph } = Typography

const Home: React.FC = () => {
  const bikes = useSelector((state: RootState) => state.bikes)
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
        sa chère région natale, la Bretagne.
      </Paragraph>
      <BikeList bikes={bikes} />
      <Title level={4} style={titleStyle}>
        Vous n&apos;avez pas trouvé votre bonheur ? Ajoutez votre propre vélo!
      </Title>
      <BikeAddCard />
    </div>
  )
}

export default Home
