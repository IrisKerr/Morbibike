import { configureStore } from '@reduxjs/toolkit';
import bikeReducer from './reducers/bikeSlice'; 

// définition de Rootstate
export type RootState = ReturnType<typeof store.getState>;


export const configureAppStore = () => {
    return configureStore({
      reducer: {
        bikes: bikeReducer, 
      },
  
    });
  };
  
  export const store = configureAppStore();