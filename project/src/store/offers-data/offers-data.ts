import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { OffersData } from '../../types/state';
import { fetchLoadCommentAction, fetchLoadNearbyOfferAction, fetchLoadOfferAction, fetchLoadOffersAction, fetchSendCommentAction } from '../api-actions';

const initialState: OffersData = {
  offers: [],
  propertyOffer: null,
  isDataLoaded: false,
  comment: null,
  nearbyOffers: [],
  formError: {
    sending: false,
    error: false,
  },
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeFavoriteOffer: (state, action) => {
      const offers = state.offers;
      const offer = offers.find((x) => x.id === action.payload);
      if(offer) {
        offer.isFavorite = !offer.isFavorite;
      }
      state.offers = [...offers];
    },
    changeFavoritePropertyOffer: (state) => {
      if(state.propertyOffer) {
        state.propertyOffer.isFavorite = !state.propertyOffer.isFavorite;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLoadOffersAction.pending, (state) => {
        state.offers = [];
        state.isDataLoaded = true;
      })
      .addCase(fetchLoadOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchLoadOffersAction.rejected, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchLoadOfferAction.pending, (state) => {
        state.propertyOffer = null;
      })
      .addCase(fetchLoadOfferAction.fulfilled, (state, action) => {
        state.propertyOffer = action.payload;
      })
      .addCase(fetchLoadOfferAction.rejected, (state) => {
        state.propertyOffer = undefined;
      })
      .addCase(fetchLoadCommentAction.fulfilled, (state, action) => {
        state.comment = action.payload.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).splice(0, 10);
      })
      .addCase(fetchSendCommentAction.pending, (state) => {
        state.formError.sending = true;
        state.formError.error = false;
      })
      .addCase(fetchSendCommentAction.rejected, (state) => {
        state.formError.sending = false;
        state.formError.error = true;
      })
      .addCase(fetchSendCommentAction.fulfilled, (state, action) => {
        state.formError.sending = false;
        state.formError.error = false;
        state.comment = state.comment = action.payload.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).splice(0, 10);
      })
      .addCase(fetchLoadNearbyOfferAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  },
});

export const { changeFavoriteOffer, changeFavoritePropertyOffer } = offersData.actions;
