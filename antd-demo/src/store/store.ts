import { configureStore } from '@reduxjs/toolkit'
import bikeReducer from './reducers/bikeSlice'
import rentalReducer from './reducers/rentalSlice'
import superModalReducer from './reducers/superModalSlice'
// définition de Rootstate
export type RootState = ReturnType<typeof store.getState>

export const configureAppStore = () => {
  return configureStore({
    reducer: {
      bikes: bikeReducer,
      rentals: rentalReducer,
      superModal: superModalReducer,
    },
  })
}

export const store = configureAppStore()

export type AppDispatch = typeof store.dispatch
