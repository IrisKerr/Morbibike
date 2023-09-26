import React from 'react'
import { Link } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd'

export const NavigateButtons = () => {
  return (
    <div className="custom-link-container">
      <Row gutter={8}>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Link to="/#velos-disponibles">
            <button className="custom-link-button">
              <LeftOutlined className="custom-link-icon" />
              Accéder à la liste des vélos
            </button>
          </Link>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Link to="/#calendrier-locations">
            <button className="custom-link-button">
              <LeftOutlined className="custom-link-icon" />
              Voir le calendrier des locations
            </button>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default NavigateButtons
