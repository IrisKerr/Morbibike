// src/routes/Home.tsx
import React from 'react'
import { RootState } from '../store/store'
import { Typography } from 'antd'
import { Bike } from '../components/bike/Bike'
import { useAppSelector } from '../store/hooks'
import RentCalendar from '../components/RentCalendar'
import Image from '../../src/assets/morbibike.png'
import { Anchor } from 'antd'

const { Title, Paragraph } = Typography

const Home: React.FC = () => {
  const bikes = useAppSelector((state: RootState) => state.bikes.bikes)
  console.log('vélos du store', bikes)

  const paragraphStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    lineHeight: '2',
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

  const imageContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '93vh',
    position: 'relative',
  }
  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  }

  const mainTitleStyle: React.CSSProperties = {
    fontSize: '3.5rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
  }
  const linkButtonStyle: React.CSSProperties = {
    backgroundColor: '#ff9933',
    fontSize: '1.2rem',
    width: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '2rem',
    marginTop: '1rem',
  }

  const titleStyle: React.CSSProperties = {
    margin: '5rem auto 0.1rem',
    padding: '1rem',
    color: '#ff9933',
  }

  const addBikeStyle: React.CSSProperties = {
    marginTop: '5rem',
    backgroundColor: '#FDBF66',
    padding: '2rem 0',
    borderRadius: '1rem',
  }

  return (
    <div style={containerStyle}>
      {/* afficher seulement la liste des velos disponibles! */}
      <div style={imageContainerStyle}>
        <img style={imageStyle} src={Image} alt="Morbibike" />
        <div style={overlayStyle}>
          <h2 style={mainTitleStyle}>Morbibike</h2>
          <p style={descriptionStyle}>
            Première agence de location de vélos dans le Morbihan.
          </p>
          <Anchor style={linkButtonStyle}>
            <Anchor.Link
              href="#velos-disponibles"
              title="Voir les vélos"
              className="custom-anchor-link"
            />
          </Anchor>
        </div>
      </div>
      <Title level={2} style={titleStyle} id="velos-disponibles">
        Nos vélos disponibles à la location
      </Title>
      <Paragraph style={paragraphStyle}>
        Le fondateur de Morbibike, Jacques Pedalo, est un homme passionné.{' '}
        <br /> Il n&apos;y a qu&apos;une chose qui puisse rivaliser avec son
        amour pour la Bretagne : ses vélos. Il les chérit tellement qu&apos;il
        les a baptisés en l&apos;honneur de sa chère région natale, la Bretagne.
        Découvrez-les !
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
