import React from 'react'
import { Card, Image, Row, Col } from 'antd'

import { Velo } from '../../../models/types'
import { Bike } from '../Bike'
import Action from '../action/Action'
import { SuperModalType } from '../../../modules/super-modal/SuperModalTypes'

interface BikeDetailCardProps {
  bike: Velo // instance de Velo pour afficher les détails d'un vélo spécifique
  style?: object
}

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
}

const cardStyle: React.CSSProperties = {
  margin: '0.5rem auto 2rem auto',
  maxWidth: '700px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
}

const imageContainerStyle: React.CSSProperties = {
  // width: '300px',
  // margin: '0.5rem auto 2rem auto',
  padding: '1rem',
  // boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'initial',
}

const descriptionContainerStyle: React.CSSProperties = {
  padding: '1rem',
  fontSize: '0.8rem',
}

const metaStyle: React.CSSProperties = {
  fontWeight: '600',
  marginRight: '0.2rem',
}

const buttonStyle: React.CSSProperties = {
  marginTop: '1.5rem',
  width: '100%',
}

export const DetailsCard: React.FC<BikeDetailCardProps> = ({ bike, style }) => {
  return (
    <>
      <Card key={bike.id} title={bike.name} style={cardStyle}>
        <Row gutter={8}>
          <Col xs={24} md={12}>
            <div style={descriptionContainerStyle}>
              <p>
                <span style={metaStyle}>Modèle:</span> {bike.model}
              </p>
              <p>
                <span style={metaStyle}>Année:</span> {bike.year}
              </p>
              <p>
                <span style={metaStyle}>Type de vélo:</span> {bike.bikeType}
              </p>
              <p>
                <span style={metaStyle}>Couleur:</span> {bike.color}
              </p>
              <div style={buttonContainerStyle}>
                <Action type="update" entity={SuperModalType.velo} />
                <Action type="delete" entity={SuperModalType.velo} />
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div style={imageContainerStyle}>
              <Image src={bike.image} alt={bike.name} />
              <div style={buttonStyle}>
                <Action type="create" entity={SuperModalType.rent} />
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export type DetailsCardType = { DetailsCard: typeof DetailsCard }
