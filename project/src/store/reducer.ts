/* eslint-disable no-console */
import { createReducer } from '@reduxjs/toolkit';
import { city } from '../const';
import { Offer } from '../types/offer';
import { chenageCity, setOffers, setSort, changeSort } from './action';

const initialState = {
  city: city,
  offers: [] as Offer[],
  sort: '',
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setOffers, (state, action) => {
    state.offers = action.payload;
  });
  builder.addCase(chenageCity, (state, action) => {
    state.city = action.payload;
  });
  builder.addCase(setSort, (state, action) => {
    state.sort = action.payload;
  });
  builder.addCase(changeSort, (state, action) => {
    state.sort = action.payload.sort;
    state.offers = action.payload.offers;
  });
});
