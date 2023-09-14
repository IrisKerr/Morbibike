import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

// import { initialBikes } from "../data/initialData"
import { Velo } from '../models/types'
import { Typography } from 'antd'
import { Bike } from '../components/bike/Bike'
const { Title } = Typography

const BikeDetailContainer: React.FC = () => {
  const bikes = useSelector((state: RootState) => state.bikes)
  console.log('détail du vélo du store', bikes)
  // Utilisez useParams() pour extraire l'ID du vélo à partir de l'URL
  const { id } = useParams<{ id?: string }>()

  if (typeof id === 'undefined') {
    return <div>Identifiant de vélo non spécifié</div>
  }

  const bikeId = parseInt(id, 10)

  const selectedBike: Velo | undefined = bikes.find(
    (bike) => bike.id === bikeId
  )

  if (!selectedBike) {
    return <div>Vélo non trouvé</div>
  }

  return (
    <div>
      <Title level={3}>Détails du vélo</Title>
      <Bike.DetailsCard bike={selectedBike} />
    </div>
  )
}

export default BikeDetailContainer
