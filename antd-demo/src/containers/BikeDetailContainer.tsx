import { useParams } from 'react-router-dom'
import { Space, Typography, Result } from 'antd'
import { Row, Col } from 'antd'
import { selectBikeById } from '../store/reducers/bikeSlice'
import { useAppSelector } from '../store/hooks'
import Rental from '../forms/rent/Create'
import { Bike } from '../components/bike/Bike'
import BikeCalendar from '../components/bike/calendar/Calendar'
const { Title, Text } = Typography

const titleStyle: React.CSSProperties = {
  margin: '5rem auto 1rem',
  padding: '1rem',
  color: '#ff9933',
}

const warningStyle: React.CSSProperties = {
  marginTop: '10rem',
}

const BikeDetailContainer = () => {
  const { id } = useParams<{ id?: string }>()
  const bikeId = id ? Number(id) : undefined
  const selectedBike = useAppSelector(selectBikeById(Number(id))) //On met le find dans le reducer en creant un custom selector pour reuse le code plus facilement
  // Ne pas utiliser parseInt mais plutot un cast dans le type souhiaté ex : Number("1") = 1 et String(1) = "1"
  return (
    // on utilise un ternaire qui test si selected bike existe (https://www.pierre-giraud.com/javascript-apprendre-coder-cours/operateur-ternaire/)
    selectedBike ? ( //Condition en ternaire true
      <Space direction="vertical">
        <Title level={3} style={titleStyle}>
          Détails du vélo et calendrier de location
        </Title>
        <Row gutter={[32, 16]}>
          <Col md={{ span: 12 }} lg={{ span: 18 }}>
            <Bike.DetailsCard bike={selectedBike} />
          </Col>
          <Col md={{ span: 12 }} lg={{ span: 6 }}>
            <BikeCalendar bikeId={bikeId} />
          </Col>
        </Row>
      </Space>
    ) : (
      //Condition en ternaire false
      <Result
        status="warning"
        title="Votre vélo n'a pas été trouvé ou n'existe pas.."
        style={warningStyle}
      />
      // possiblement utiliser le composant ant design 'result' en type error
    )
  )
}

export default BikeDetailContainer
