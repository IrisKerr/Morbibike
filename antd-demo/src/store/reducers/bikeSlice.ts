import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Velo } from '../../models/types'
import { initialBikes } from '../../data/initialData'
import { RootState } from '../store'

interface initialStateType {
  bikes: Velo[]
}
const initialState: initialStateType = {
  bikes: initialBikes,
}

const bikeSlice = createSlice({
  name: 'bikes',

  initialState: initialState, // Utilisez initialBikes comme état initial
  reducers: {
    // ajout d'un vélo
    addBike: (state, action: PayloadAction<Velo>) => {
      state.bikes = [...state.bikes, action.payload]
    },
    // modification d'un vélo
    editBike: (state, action: PayloadAction<Velo>) => {
      const bikeIndex = state.bikes.findIndex(
        (bike) => bike.id === action.payload.id
      )
      if (bikeIndex !== -1) {
        state.bikes[bikeIndex] = action.payload
      }
    },
    // suppression d'un vélo
    deleteBike: (state, action: PayloadAction<number>) => {
      const bikeIdToDelete = action.payload
      state.bikes = state.bikes.filter((bike) => bike.id !== bikeIdToDelete)
    },
    // modification de la couleur d'un vélo
    updateBikeColor: (
      state,
      action: PayloadAction<{ bikeId: number; color: string }>
    ) => {
      const { bikeId, color } = action.payload
      const bikeToUpdate = state.bikes.find((bike) => bike.id === bikeId)
      if (bikeToUpdate) {
        bikeToUpdate.color = color
      }
    },
  },
})

/**
 * Selectors
 */
const selectRawItems: (state: RootState) => Velo[] = (state: RootState) =>
  state[bikeSlice.name].bikes

export const selectBikeById = (
  id: number // Export du selecteur par id
) =>
  createSelector([selectRawItems], (items) =>
    items.find((bike) => bike.id === id)
  )

export const { addBike, editBike, deleteBike, updateBikeColor } =
  bikeSlice.actions

export default bikeSlice.reducer
