import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { APIRoute } from '../const';
import { setOffers, setDataLoadedStatus, setComment } from './action';
import { Offers } from '../types/offer.js';
import { Reviews } from '../types/review.js';

export const fetchLoadOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(setDataLoadedStatus(true));
    dispatch(setOffers(data));
    dispatch(setDataLoadedStatus(false));
  });

export const fetchLoadCommentAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchComment',
  async (id, { dispatch, extra: api }) => {
    if(id) {
      const commentId = APIRoute.Comment.replace(':id', (id).toString());
      const { data } = await api.get<Reviews>(commentId);
      dispatch(setComment(data));
    }
  });
