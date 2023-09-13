import { configureStore } from '@reduxjs/toolkit';
import bikeReducer from './reducers/bikeSlice'; 

export const configureAppStore = () => {
    return configureStore({
      reducer: {
        bikes: bikeReducer, // Assurez-vous que le nom correspond à celui défini dans le Slice
      },
      // Autres options de configuration, par exemple, middleware
    });
  };
  
  export const store = configureAppStore();