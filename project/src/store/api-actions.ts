import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { APIRoute, AppRoute } from '../const';
import { redirect } from './action';
import { Offers, Offer } from '../types/offer';
import { Reviews, Comment } from '../types/review';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';

type AsyncThunkType = {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
};

export const checkAuthAction = createAsyncThunk<void, undefined, AsyncThunkType>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  await api.get(APIRoute.Login);
});

export const loginAction = createAsyncThunk<UserData, AuthData, AsyncThunkType>('user/login', async ({ login: email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
  saveToken(data.token);
  dispatch(redirect(AppRoute.Root));
  return data;
});

export const logoutAction = createAsyncThunk<void, undefined, AsyncThunkType>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});

export const fetchLoadOffersAction = createAsyncThunk<Offer[], undefined, AsyncThunkType>('data/fetchLoadOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Offers>(APIRoute.Offers);
  return data;
});

export const fetchLoadOfferAction = createAsyncThunk<Offer, number, AsyncThunkType>('data/fetchLoadOffer', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer>(APIRoute.Offer.replace(':id', (id).toString()));
  return data;
});

export const fetchLoadCommentAction = createAsyncThunk<Reviews, number, AsyncThunkType>('data/fetchLoadComment', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<Reviews>(APIRoute.Comment.replace(':id', (id).toString()));
  return data;
});

export const fetchSendCommentAction = createAsyncThunk<Reviews, Comment, AsyncThunkType>('data/fetchSendComment', async ({ id, comment, rating }, { dispatch, extra: api }) => {
  const { data } = await api.post<Reviews>(APIRoute.Comment.replace(':id', (id).toString()), { comment: comment, rating: rating });
  return data;
});

export const fetchLoadNearbyOfferAction = createAsyncThunk<Offers, number, AsyncThunkType>('data/fetchLoadNearbyOffer', async (id, { dispatch, extra: api }) => {
  const { data } = await api.get<Offers>(APIRoute.Nearby.replace(':id', (id).toString()));
  return data;
});

