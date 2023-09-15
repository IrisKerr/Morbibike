import React from 'react'
import { Card } from 'antd'

import { Velo } from '../../../models/types'
import { Bike } from '../Bike'

interface BikeDetailCardProps {
  bike: Velo // instance de Velo pour afficher les détails d'un vélo spécifique
}

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '0.5rem',
}

const cardStyle: React.CSSProperties = {
  width: '300px',
  margin: '0.5rem auto 2rem auto',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
}

export const DetailsCard: React.FC<BikeDetailCardProps> = ({ bike }) => {
  return (
    <>
      <Card key={bike.id} title={bike.name} style={cardStyle}>
        <p>Modèle: {bike.model}</p>
        <p>Année: {bike.year}</p>
        <p>Type de vélo: {bike.bikeType}</p>
        <p>Couleur: {bike.color}</p>
        <div style={buttonContainerStyle}>
          <Bike.EditButton />
          <Bike.DeleteButton />
        </div>
      </Card>
    </>
  )
}

export type DetailsCardType = { DetailsCard: typeof DetailsCard }
