import { configureStore } from '@reduxjs/toolkit';
import bikeReducer from './reducers/bikeSlice'; 
import rentalReducer from './reducers/rentalSlice'; 

// définition de Rootstate
export type RootState = ReturnType<typeof store.getState>;


export const configureAppStore = () => {
    return configureStore({
      reducer: {
        bikes: bikeReducer,
        rentals: rentalReducer,
      },
  
    });
  };
  
  export const store = configureAppStore();