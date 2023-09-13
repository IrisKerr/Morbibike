import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Velo } from '../../models/types'
import { initialBikes } from '../../data/initialData'
import { RootState } from '../store'

interface initialStateType {
  bikes: Velo[]
}
const initialState : initialStateType = {
  bikes: initialBikes,
}

const bikeSlice = createSlice({
  name: 'bikes',
  initialState: initialState, // Utilisez initialBikes comme état initial
  reducers: {
    addBike: (state, action: PayloadAction<Velo>) => {
      state.bikes = [...state.bikes, action.payload]
    },
  },
})

/**
 * Selectors
 */
const selectRawItems: (state: RootState) => Velo[] = (state: RootState) =>
  state[bikeSlice.name].bikes

export const selectBikeById = (id: number) => // Exportez le selecteur par id
  createSelector([selectRawItems], (items) =>
    items.find((bike) => bike.id === id)
)

export const { addBike } = bikeSlice.actions // Exposez les actions pour être utilisées ailleurs

export default bikeSlice.reducer; // Exportez le réducteur