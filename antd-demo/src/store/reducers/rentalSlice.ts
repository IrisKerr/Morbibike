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
  },
})

export const { addRental } = rentalSlice.actions

export default rentalSlice.reducer
