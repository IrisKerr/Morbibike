import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-scroll'

import Image from '../../src/assets/morbibike.png'

const mainTitleStyle: React.CSSProperties = {
  fontSize: '8vh',
}

const descriptionStyle: React.CSSProperties = {
  fontSize: '1.2rem',
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
  opacity: '0.9',
}

const overlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: '#3333339b',
  transition: 'background-color 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
}

// Taille pour les écrans mobiles
if (window.innerWidth <= 768) {
  mainTitleStyle.fontSize = '2.2rem'
  descriptionStyle.fontSize = '1.1rem'
}

export const LandingSection = () => {
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
