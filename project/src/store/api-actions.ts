import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute } from '../const';
import { setOffers, setDataLoadedStatus, setPropertyOffer, setComment, setNearbyOffers } from './action';
import { Offers, Offer } from '../types/offer.js';
import { Reviews } from '../types/review.js';

export const fetchLoadOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offers>(APIRoute.Offers);
      dispatch(setDataLoadedStatus(true));
      dispatch(setOffers(data));
      dispatch(setDataLoadedStatus(false));
    } catch (error) {
      throw new Error('Unable to load offers');
    }
  });

export const fetchLoadOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchOffer',
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Offer>(APIRoute.Offer.replace(':id', (id).toString()));
      dispatch(setPropertyOffer(data));
    } catch {
      throw new Error('Unable to load offer');
    }
  }
);

export const fetchLoadCommentAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchComment',
  async (id, { dispatch, extra: api }) => {
    try {
      const commentId = APIRoute.Comment.replace(':id', (id).toString());
      const { data } = await api.get<Reviews>(commentId);
      dispatch(setComment(data));
    } catch (error) {
      throw new Error('Unable to load comments');
    }
  });

export const fetchLoadNearbyOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchNearbyOffers',
  async (id, { dispatch, extra: api }) => {
    try {
      const nearbyOffersId = APIRoute.Nearby.replace(':id', (id).toString());
      const { data } = await api.get<Offers>(nearbyOffersId);
      dispatch(setNearbyOffers(data));
    } catch (error) {
      throw new Error('Unable to load Nearby Offers');
    }
  });

