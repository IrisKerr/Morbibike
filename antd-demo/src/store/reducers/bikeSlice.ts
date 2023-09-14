// bikeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Velo } from '../../models/types' // Import du type vélo
import { initialBikes } from '../../data/initialData'

const bikeSlice = createSlice({
  name: 'bikes',
  initialState: initialBikes as Velo[], // initialBikes = état initial
  reducers: {
    addBike: (state, action: PayloadAction<Velo>) => {
      state.push(action.payload) // Ajoute un nouveau vélo à l'état
    },
    editBike: (
      state,
      action: PayloadAction<{ id: number; updatedBike: Velo }>
    ) => {
      const { id, updatedBike } = action.payload
      const bikeIndex = state.findIndex((bike) => bike.id === id)
      if (bikeIndex !== -1) {
        state[bikeIndex] = updatedBike
      }
    },
    deleteBike: (state, action: PayloadAction<number>) => {
      const bikeIdToDelete = action.payload
      const newState = state.filter((bike) => bike.id !== bikeIdToDelete)
      return newState
    },
  },
})

export const { addBike, editBike, deleteBike } = bikeSlice.actions // Exposez les actions pour être utilisées ailleurs

export default bikeSlice.reducer // Exportez le réducteur
