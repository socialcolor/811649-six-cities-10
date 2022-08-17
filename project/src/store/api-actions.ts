import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { APIRoute } from '../const';
import { setOffers } from './action';
import { Offers } from '../types/offer.js';

export const fetchLoadOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffers(data));
  });

