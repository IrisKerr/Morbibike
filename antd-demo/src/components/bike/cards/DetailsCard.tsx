import React, { useState } from 'react'
import { Card, Image, Row, Col } from 'antd'
import { useDispatch } from 'react-redux'
import { updateBikeColor } from '../../../store/reducers/bikeSlice'
import { Velo } from '../../../models/types'
import { Bike } from '../Bike'
import Action from '../action/Action'
import { SuperModalType } from '../../../modules/super-modal/SuperModalTypes'
import { ColorPicker } from 'antd'
import type { Color } from 'antd/es/color-picker'

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
  const dispatch = useDispatch()
  const [selectedColor, setSelectedColor] = useState(bike.color)

  const handleColorChange = (colorValue: Color, hex: string) => {
    setSelectedColor(hex)

    dispatch(updateBikeColor({ bikeId: bike.id, color: hex }))
  }

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
                {/* <span style={metaStyle}>Couleur:</span> {bike.color} */}
                <span style={metaStyle}>Couleur:</span>
                <ColorPicker
                  value={selectedColor}
                  onChange={handleColorChange}
                />
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
