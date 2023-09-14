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
    addBike: (state, action: PayloadAction<Velo>) => {
      state.bikes = [...state.bikes, action.payload]
    },
    // editBike: (
    //   state,
    //   action: PayloadAction<{ id: number; updatedBike: Velo }>
    // ) => {
    //   const { id, updatedBike } = action.payload
    //   const bikeIndex = state.bikes.findIndex((bike) => bike.id === id)
    //   if (bikeIndex !== -1) {
    //     state.bikes[bikeIndex] = updatedBike
    //   }
    // },
    editBike: (state, action: PayloadAction<Velo>) => {
      state.bikes = state.bikes.map((bike) => {
        if (action.payload.id === bike.id) {
          return bike
        }
        return action.payload
      })
    },
    deleteBike: (state, action: PayloadAction<number>) => {
      const bikeIdToDelete = action.payload
      state.bikes = state.bikes.filter((bike) => bike.id !== bikeIdToDelete)
    },
  },
})

/**
 * Selectors
 */
const selectRawItems: (state: RootState) => Velo[] = (state: RootState) =>
  state[bikeSlice.name].bikes

export const selectBikeById = (
  id: number // Exportez le selecteur par id
) =>
  createSelector([selectRawItems], (items) =>
    items.find((bike) => bike.id === id)
  )

export const { addBike, editBike, deleteBike } = bikeSlice.actions // Exposez les actions pour être utilisées ailleurs

export default bikeSlice.reducer // Exportez le réducteur
