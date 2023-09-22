import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Velo } from '../../models/types'
import { Rent } from '../../models/types'
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
    editBike: (state, action: PayloadAction<Velo>) => {
      const bikeIndex = state.bikes.findIndex(
        (bike) => bike.id === action.payload.id
      )
      if (bikeIndex !== -1) {
        state.bikes[bikeIndex] = action.payload
      }
    },
    deleteBike: (state, action: PayloadAction<number>) => {
      const bikeIdToDelete = action.payload
      state.bikes = state.bikes.filter((bike) => bike.id !== bikeIdToDelete)
    },
    // updateBikeRents: (
    //   state,
    //   action: PayloadAction<{ bikeId: number; rent: Rent }>
    // ) => {
    //   const { bikeId, rent } = action.payload
    //   const updatedBikes = state.bikes.map((bike) => {
    //     if (bike.id === bikeId) {
    //       // Mettez à jour le tableau 'rents' du vélo associé
    //       return {
    //         ...bike,
    //         rents: [...bike.rents, rent],
    //       }
    //     }
    //     return bike
    //   })
    //   state.bikes = updatedBikes
    // },
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
