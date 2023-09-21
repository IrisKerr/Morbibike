import React from 'react'
import { Typography, Row, Col } from 'antd'
const { Title } = Typography
import { Bike } from '../components/bike/Bike'
import Image from '../assets/pexels-golden-bike.jpg'

const containerStyle: React.CSSProperties = {
  borderRadius: '2rem',
  margin: '8rem auto 5rem',
  maxWidth: '1000px',
  minHeight: '500px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
}

const imageStyle: React.CSSProperties = {
  borderRadius: '2rem 0 0 2rem',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
}

const descriptionContainerStyle: React.CSSProperties = {
  padding: '2rem',
}

const titleStyle: React.CSSProperties = {
  margin: '3rem auto 0.1rem',
  padding: '1rem',
  color: '#ff9933',
}

function BikeAddContainer() {
  return (
    <Row gutter={16} justify="center" style={containerStyle}>
      <Col xs={24} md={12} className="ant-col">
        <img src={Image} alt="" style={imageStyle} />
      </Col>
      <Col xs={24} md={12}>
        <div style={descriptionContainerStyle}>
          <Title level={2} style={titleStyle}>
            Vous n&apos;avez pas trouvé votre bonheur ?
          </Title>
          <Title level={3} style={titleStyle}>
            Ajoutez votre propre vélo!
          </Title>
          <Bike.AddCard />
        </div>
      </Col>
    </Row>
  )
}

export default BikeAddContainer
