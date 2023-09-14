import { Dispatch } from 'redux'
import { addRental } from '../reducers/rentalSlice'
import { Rent } from '../../models/types'

// Action pour ajouter une location
export const addRentalAction = (rentalData: Rent) => {
  return (dispatch: Dispatch) => {
    dispatch(addRental(rentalData))
  }
}
