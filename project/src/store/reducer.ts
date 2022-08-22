import { createReducer } from '@reduxjs/toolkit';
import { SortName, city } from '../const';
import { Offer, City } from '../types/offer';
import { Reviews } from '../types/review';
import { changeCity, setOffers, changeActiveSort, setDataLoadedStatus, setPropertyOffer, setComment, setNearbyOffers, requireAuthorization, setUser } from './action';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/user-data';

type InitialState = {
  user: UserData,
  favorite: Offer[],
  authorizationStatus: AuthorizationStatus,
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
  user: {} as UserData,
  favorite: [] as Offer[],
  authorizationStatus: AuthorizationStatus.Unknown,
  city: city.Amsterdam,
  offers: [] as Offer[],
  allOffers: [] as Offer[],
  propertyOffer: {} as Offer,
  currentSort: SortName.Popular,
  isDataLoaded: false,
  comment: [] as Reviews,
  nearbyOffers: [] as Offer[],
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (state, action) => {
    state.authorizationStatus = action.payload;
  })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
      state.allOffers = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.city = city[action.payload];
    })
    .addCase(changeActiveSort, (state, action) => {
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
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(setPropertyOffer, (state, action) => {
      state.propertyOffer = action.payload;
    })
    .addCase(setComment, (state, action) => {
      state.comment = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    });
});
