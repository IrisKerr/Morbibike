// rentalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Rent } from '../../models/types'; 
import { initialBikes } from '../../data/initialData'


interface initialStateType {
    rentals: Rent[]
  }
  const initialState : initialStateType = {
    rentals: [],
  }

const rentalSlice = createSlice({
  name: 'rentals',
  initialState, // initialRentals comme état initial
  reducers: {
    addRental: (state, action: PayloadAction<Rent>) => {
      state.rentals = [...state.rentals, action.payload] // Ajoute une nouvelle location au state
    
    // Mettre à jour la propriété 'rents' du vélo associé
    const { velo } = action.payload;
    const bikeToUpdate = initialBikes.find((bike) => bike.id === velo.id);

    if (bikeToUpdate) {
      bikeToUpdate.rents.push(action.payload);
    }

  },
}
});

export const { addRental } = rentalSlice.actions; 

export default rentalSlice.reducer; 
