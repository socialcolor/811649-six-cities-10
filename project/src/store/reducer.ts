import { createReducer } from '@reduxjs/toolkit';
import { city } from '../const';
import { Hotel } from '../types/hotel';
import { chenageCity, setOffers } from './action';

const initialState = {
  city: city,
  offers: [] as Hotel[],
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setOffers, (state, action) => {
    state.offers = action.payload;
  });
  builder.addCase(chenageCity, (state, action) => {
    state.city.name = action.payload;
  });
});
