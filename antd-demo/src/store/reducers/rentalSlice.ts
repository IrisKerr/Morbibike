import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Rent } from '../../models/types'
import { RootState } from '../store'

interface RentalState {
  rentals: Rent[]
  selectedId: number | undefined
}
const initialState: RentalState = {
  rentals: [],
  selectedId: undefined,
}

const rentalSlice = createSlice({
  name: 'rentals',
  initialState, // initialRentals comme état initial
  reducers: {
    // ajouter une location
    addRental: (state, action: PayloadAction<Rent>) => {
      state.rentals = [...state.rentals, action.payload] // Ajoute une nouvelle location au state
    },
    // modifier la liste des locations
    updateRentalList: (state, action: PayloadAction<Rent[]>) => {
      state.rentals = action.payload
    },
    // modifier une location
    editRental: (state, action: PayloadAction<Rent>) => {
      const { id } = action.payload
      // trouver l'index de la location à modifier dans le tableau
      const index = state.rentals.findIndex((rental) => rental.id === id)

      if (index !== -1) {
        // remplacer la location existante par la nouvelle location
        state.rentals[index] = action.payload
      }
    },
    setSelectedId: (state, action: PayloadAction<number>) => {
      state.selectedId = action.payload
    },
  },
})

// Sélecteurs

// sélecteur pour obtenir la liste des locations en cours
const selectRawRentals: (state: RootState) => Rent[] = (state: RootState) =>
  state.rentals.rentals

// sélecteur pour récupérer une location via son id
export const selectRentalById = (
  id: number // id correspondant à la location
) =>
  createSelector([selectRawRentals], (rentals) =>
    rentals.find((rental) => rental.id === id)
  )

export const { addRental, updateRentalList, editRental, setSelectedId } =
  rentalSlice.actions

export default rentalSlice.reducer
