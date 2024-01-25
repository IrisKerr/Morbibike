import { useParams } from 'react-router-dom'
import { Space, Typography, Result } from 'antd'
import { Row, Col } from 'antd'
import { selectBikeById } from '../store/reducers/bikeSlice'
import { useAppSelector } from '../store/hooks'
import { Bike } from '../components/bike/Bike'

const { Title } = Typography

const containerStyle: React.CSSProperties = {
  padding: '0 1rem',
}

const titleStyle: React.CSSProperties = {
  margin: '5rem auto 1rem',
  padding: '1rem',
  color: '#ffffff',
}

const warningStyle: React.CSSProperties = {
  marginTop: '10rem',
}

export const BikeDetailContainer = () => {
  const { id } = useParams<{ id?: string }>()
  const bikeId = id ? Number(id) : undefined
  const selectedBike = useAppSelector(selectBikeById(Number(id))) //On met le find dans le reducer en creant un custom selector pour reuse le code plus facilement
  // Ne pas utiliser parseInt mais plutot un cast dans le type souhiaté ex : Number("1") = 1 et String(1) = "1"
  return (
    // on utilise un ternaire qui test si selected bike existe (https://www.pierre-giraud.com/javascript-apprendre-coder-cours/operateur-ternaire/)
    selectedBike ? (
      <Space direction="vertical" style={containerStyle}>
        <Title level={3} style={titleStyle}>
          Détails du vélo et calendrier de location
        </Title>
        <Row gutter={[32, 16]}>
          <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }}>
            <Bike.DetailsCard bike={selectedBike} />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
            <Bike.ItemCalendar bikeId={bikeId} />
          </Col>
        </Row>
      </Space>
    ) : (
      <Result
        status="warning"
        title="Votre vélo n'a pas été trouvé ou n'existe pas.."
        style={warningStyle}
      />
    )
  )
}

export default BikeDetailContainer
