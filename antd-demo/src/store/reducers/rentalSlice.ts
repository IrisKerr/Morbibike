import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Rent } from '../../models/types'

interface RentalState {
  rentals: Rent[]
}
const initialState: RentalState = {
  rentals: [],
}

const rentalSlice = createSlice({
  name: 'rentals',
  initialState, // initialRentals comme état initial
  reducers: {
    addRental: (state, action: PayloadAction<Rent>) => {
      state.rentals = [...state.rentals, action.payload] // Ajoute une nouvelle location au state
    },
    updateRentalList: (state, action: PayloadAction<Rent[]>) => {
      state.rentals = action.payload
    },
    editRental: (state, action: PayloadAction<Rent>) => {
      const { id } = action.payload
      // trouver l'index de la location à modifier dans le tableau
      const index = state.rentals.findIndex((rental) => rental.id === id)

      if (index !== -1) {
        // remplacer la location existante par la nouvelle location
        state.rentals[index] = action.payload
      }
    },
  },
})

export const { addRental, updateRentalList, editRental } = rentalSlice.actions

export default rentalSlice.reducer
