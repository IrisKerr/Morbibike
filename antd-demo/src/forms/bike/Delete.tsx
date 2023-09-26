import { Button } from 'antd'
import { message } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { deleteBike } from '../../store/reducers/bikeSlice'
import { RootState } from '../../store/store'

interface Props {
  handleCancel: () => void
}

export const Delete = ({ handleCancel }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const bikeId = id ? Number(id) : undefined

  const rentals = useAppSelector((state: RootState) => state.rentals.rentals)

  const handleDelete = () => {
    // Vérifie si le vélo est déjà loué
    const isBikeAlreadyRented = rentals.some(
      (rental) => rental.bikeId === bikeId
    )

    if (isBikeAlreadyRented) {
      // Affiche un message d'erreur et empêche la suppression
      message.error('Le vélo est actuellement loué. Impossible de le supprimer')
    } else {
      // Dispatch l'action de suppression avec l'ID du vélo
      dispatch(deleteBike(bikeId!)) // As the componenent is rendered when bikeId is not undefined we can safely assume it won't be undefined here
      console.log('vélo supprimé')
      handleCancel() // Ferme la boîte de dialogue modale après la suppression
      navigate('/')
    }
  }

  return bikeId ? (
    <>
      <Button onClick={handleDelete} style={{ marginRight: '1rem' }}>
        Supprimer
      </Button>
      <Button onClick={handleCancel}>Annuler</Button>
    </>
  ) : (
    <></>
  )
}

export default Delete
