import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-scroll'

import Image from '../../src/assets/morbibike.png'

interface Props {}

function LandingSection(props: Props) {
  const {} = props

  const mainTitleStyle: React.CSSProperties = {
    fontSize: '10vh',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
  }

  const descriptionStyle: React.CSSProperties = {
    fontSize: '1.5rem',

    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
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

  if (window.innerWidth <= 768) {
    mainTitleStyle.fontSize = '2.2rem' // Taille pour les écrans mobiles
    descriptionStyle.fontSize = '1.1rem' // Taille pour les écrans mobiles
  }

  return (
    <div style={imageContainerStyle}>
      <img style={imageStyle} src={Image} alt="Morbibike" />
      <div style={overlayStyle}>
        <h2 style={mainTitleStyle}>Morbibike</h2>
        <p style={descriptionStyle}>
          Première agence de location de vélos dans le Morbihan.
        </p>
        <Link to="velos-disponibles" smooth={true} duration={600}>
          <Button className="custom-anchor-link">Voir les vélos</Button>
        </Link>
      </div>
    </div>
  )
}

export default LandingSection
