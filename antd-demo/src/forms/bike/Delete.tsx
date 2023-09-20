import { Button } from 'antd' // Importez le composant Modal d'Ant Design
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteBike } from '../../store/reducers/bikeSlice'

interface DeleteBikeProps {
  handleCancel: () => void
}

const Delete: React.FC<DeleteBikeProps> = ({ handleCancel }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const bikeId = id ? Number(id) : undefined

  const handleDelete = () => {
    // Dispatchez l'action de suppression avec l'ID du vélo
    dispatch(deleteBike(bikeId!)) // As the componenent is rendered when bikeId is not undefined we can safely assume it won't be undefined here
    console.log('vélo supprimé')
    handleCancel() // Fermez la boîte de dialogue modale après la suppression
    navigate('/')
  }

  return bikeId ? (
    <>
      <Button onClick={handleDelete}>Supprimer</Button>
      <Button onClick={handleCancel}>Annuler</Button>
    </>
  ) : (
    <></>
  )
}

export default Delete
