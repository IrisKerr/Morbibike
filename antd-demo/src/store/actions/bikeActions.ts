// bikeActions.ts
import { Dispatch } from 'redux'
import { addBike } from '../reducers/bikeSlice'
import { initialBikes } from '../../data/initialData' // Importez les données initiales

export const loadInitialData = () => {
  return async (dispatch: Dispatch) => {
    initialBikes.forEach((bike) => {
      dispatch(addBike(bike))
    })
  }
}
