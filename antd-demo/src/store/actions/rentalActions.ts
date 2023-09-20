import { Dispatch } from 'redux'
import {
  addRental,
  updateRentalList,
  editRental,
} from '../reducers/rentalSlice'
import { Rent } from '../../models/types'

// Action pour ajouter une location
export const addRentalAction = (rentalData: Rent) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(addRental(rentalData))
  }
}

export const updateRentalListAction = (updatedRentals: Rent[]) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(updateRentalList(updatedRentals))
  }
}

export const updateRentalAction = (rentalData: Rent) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(editRental(rentalData))
  }
}
