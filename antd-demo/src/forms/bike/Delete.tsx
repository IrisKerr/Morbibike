import React from 'react'
import { Button } from 'antd'
import { message } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBike } from '../../store/reducers/bikeSlice'
import { RootState } from '../../store/store'

interface DeleteBikeProps {
  handleCancel: () => void
}

const Delete: React.FC<DeleteBikeProps> = ({ handleCancel }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const bikeId = id ? Number(id) : undefined

  const rentals = useSelector((state: RootState) => state.rentals.rentals)

  const handleDelete = () => {
    // Vérifiez si le vélo est déjà loué
    const isBikeAlreadyRented = rentals.some(
      (rental) => rental.bikeId === bikeId
    )

    if (isBikeAlreadyRented) {
      // Affichez un message d'erreur ou empêchez la suppression
      console.log('Le vélo est déjà loué. Impossible de le supprimer.')
      message.error('Le vélo est déjà loué. Impossible de le supprimer')
      // Vous pouvez afficher un message d'erreur ici
    } else {
      // Dispatchez l'action de suppression avec l'ID du vélo
      dispatch(deleteBike(bikeId!)) // As the componenent is rendered when bikeId is not undefined we can safely assume it won't be undefined here
      console.log('vélo supprimé')
      handleCancel() // Fermez la boîte de dialogue modale après la suppression
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
