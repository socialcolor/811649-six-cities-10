import { createReducer } from '@reduxjs/toolkit';
import { SortName, city } from '../const';
import { Offer, City } from '../types/offer';
import { Reviews } from '../types/review';
import { changeCity, setOffers, changeActiveSort, setDataLoadedStatus, setPropertyOffer, setComment, setNearbyOffers } from './action';

type InitialState = {
  city: City,
  offers: Offer[],
  allOffers: Offer[],
  propertyOffer: Offer,
  currentSort: string,
  isDataLoaded: boolean,
  comment: Reviews,
  nearbyOffers: Offer[];
}
const initialState: InitialState = {
  city: city,
  offers: [] as Offer[],
  allOffers: [] as Offer[],
  propertyOffer: {} as Offer,
  currentSort: SortName.Popular,
  isDataLoaded: false,
  comment: [] as Reviews,
  nearbyOffers: [] as Offer[],
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
  builder.addCase(setPropertyOffer, (state, action) => {
    state.propertyOffer = action.payload;
  });
  builder.addCase(setComment, (state, action) => {
    state.comment = action.payload;
  });
  builder.addCase(setNearbyOffers, (state, action) => {
    state.nearbyOffers = action.payload;
  });
});
