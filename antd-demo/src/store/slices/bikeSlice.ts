// bikeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Velo } from '../../types/types'; // Assurez-vous d'importer les types nécessaires

const bikeSlice = createSlice({
  name: 'bikes',
  initialState: [] as Velo[], // L'état initial est un tableau de vélos
  reducers: {
    addBike: (state, action: PayloadAction<Velo>) => {
      state.push(action.payload); // Ajoute un nouveau vélo à l'état
    },
    // Définissez d'autres actions de gestion des vélos si nécessaire
  },
});

export const { addBike } = bikeSlice.actions; // Exposez les actions pour être utilisées ailleurs

export default bikeSlice.reducer; // Exportez le réducteur
