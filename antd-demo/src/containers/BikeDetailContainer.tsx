import { useParams } from 'react-router-dom'
import { Space, Typography } from 'antd'
import { selectBikeById } from '../store/reducers/bikeSlice'
import { useAppSelector } from '../store/hooks'
import Rental from '../forms/rent/Create'
import { Bike } from '../components/bike/Bike'
const { Title, Text } = Typography

const titleStyle: React.CSSProperties = {
  margin: '0.5rem auto',
  padding: '1rem',
  color: '#ff5733',
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
          Détails du vélo
        </Title>
        <Bike.DetailsCard bike={selectedBike} />
        <Title level={3} style={titleStyle}>
          Je souhaite le louer
        </Title>
        <Rental bikeId={bikeId} />
      </Space>
    ) : (
      //Condition en ternaire false
      <Text>Vélo ou id non spécifié</Text> // possiblement utiliser le composant ant design 'result' en type error
    )
  )
}

export default BikeDetailContainer
