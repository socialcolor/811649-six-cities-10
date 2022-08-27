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
    text: null
  },
  errorLoadOffers: false,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setFormError: (state) => {
      state.formError.text = null;
    },
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
        state.errorLoadOffers = false;
        state.isDataLoaded = true;
      })
      .addCase(fetchLoadOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchLoadOffersAction.rejected, (state) => {
        state.errorLoadOffers = true;
        state.isDataLoaded = false;
      })
      .addCase(fetchLoadOfferAction.pending, (state) => {
        state.propertyOffer = null;
      })
      .addCase(fetchLoadOfferAction.fulfilled, (state, action) => {
        state.propertyOffer = action.payload;
      })
      .addCase(fetchLoadOfferAction.rejected, (state, action) => {
        state.propertyOffer = undefined;
      })
      .addCase(fetchLoadCommentAction.fulfilled, (state, action) => {
        state.comment = action.payload;
      })
      .addCase(fetchSendCommentAction.pending, (state) => {
        state.formError.sending = true;
      })
      .addCase(fetchSendCommentAction.rejected, (state, action) => {
        state.formError.text = action.payload;
      })
      .addCase(fetchSendCommentAction.fulfilled, (state, action) => {
        state.formError.text = null;
        state.formError.sending = false;
        state.comment = action.payload;
      })
      .addCase(fetchLoadNearbyOfferAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  },
});

export const { setFormError, changeFavoriteOffer, changeFavoritePropertyOffer } = offersData.actions;
