import { createReducer } from '@reduxjs/toolkit';
import { SortName, city } from '../const';
import { Offer } from '../types/offer';
import { changeCity, setOffers, changeActiveSort, setDataLoadedStatus } from './action';

const initialState = {
  city: city,
  offers: [] as Offer[],
  allOffers: [] as Offer[],
  currentSort: SortName.Popular,
  isDataLoaded: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setOffers, (state, action) => {
    state.offers = action.payload;
    state.allOffers = action.payload;
  });
  builder.addCase(changeCity, (state, action) => {
    state.city = action.payload;
  });
  builder.addCase(changeActiveSort, (state, action) => {
    state.currentSort = action.payload;
    switch (state.currentSort) {
      case SortName.Popular:
        state.offers = state.allOffers;
        break;
      case SortName.LowToHigh:
        state.offers = [...state.allOffers].sort((a, b) => a.price - b.price);
        break;
      case SortName.HighToLow:
        state.offers = [...state.allOffers].sort((a, b) => b.price - a.price);
        break;
      case SortName.Top:
        state.offers = [...state.allOffers].sort((a, b) => b.rating - a.rating);
        break;
    }
  });
  builder.addCase(setDataLoadedStatus, (state, action) => {
    state.isDataLoaded = action.payload;
  });
});
