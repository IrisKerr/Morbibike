import React from 'react'
import { Card, Button, Row, Col, Image } from 'antd'
import { Link } from 'react-router-dom'
import { Velo } from '../../../models/types'

interface Props {
  bikes: Velo[]
  //   onEditClick: (bike: Velo) => void; // Callback pour gérer l'édition d'un vélo
}

const cardStyle: React.CSSProperties = {
  width: '300px',
  margin: '16px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
}

export const ListCard = ({ bikes }: Props) => {
  return (
    <div>
      <Row gutter={8} justify="center">
        {bikes.map((bike) => (
          <Col
            md={12}
            lg={6}
            key={bike.id}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Card key={bike.id} title={bike.name} style={cardStyle}>
              <Image src={bike.image} />
              <Link to={`/bike/${bike.id}`}>
                <Button type="primary" className="ant-btn margin-top">
                  Voir détails
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export type ListCardType = { ListCard: typeof ListCard }
