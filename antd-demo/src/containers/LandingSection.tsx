import React from 'react'
import { Button, Divider } from 'antd'
import { Link } from 'react-scroll'
import ImageContainer from './ImageContainer'

export const LandingSection = () => {
  return (
    <section className="landing-section">
      <div className="landing-container-image">
        <ImageContainer />
      </div>
      <div className="landing-container-text">
        <h2 className="landing-container-title">Morbibike</h2>
        <p className="landing-container-paragraph">
          Première agence de location de vélos dans le Morbihan.
        </p>
        <Link to="velos-disponibles" smooth={true} duration={600}>
          <Button className="landing-container-link custom-anchor-link">
            Voir les vélos
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default LandingSection
