// bikeActions.ts
import { Dispatch } from 'redux'
import { addBike, editBike, deleteBike } from '../reducers/bikeSlice'
import { initialBikes } from '../../data/initialData' // Importez les données initiales
import { Velo } from '../../models/types'

// Action pour ajouter un vélo
export const loadInitialData = () => {
  return async (dispatch: Dispatch) => {
    initialBikes.forEach((bike) => {
      dispatch(addBike(bike))
    })
  }
}

// Action pour éditer un vélo
export const editBikeAction = (id: number, updatedBike: Velo) => {
  return (dispatch: Dispatch) => {
    dispatch(editBike({ id, updatedBike }))
  }
}

// Action pour supprimer un vélo
export const deleteBikeAction = (id: number) => {
  return (dispatch: Dispatch) => {
    dispatch(deleteBike(id))
  }
}
