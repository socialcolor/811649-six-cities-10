import { createReducer } from '@reduxjs/toolkit';
import { city } from '../const';
import { Offer } from '../types/offer';
import { chenageCity, setOffers } from './action';

const initialState = {
  city: city,
  offers: [] as Offer[],
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setOffers, (state, action) => {
    state.offers = action.payload;
  });
  builder.addCase(chenageCity, (state, action) => {
    state.city = action.payload;
  });
});
