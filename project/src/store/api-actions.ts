import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { APIRoute, AuthorizationStatus } from '../const';
import { setOffers, setDataLoadedStatus, setPropertyOffer, setComment, setNearbyOffers, requireAuthorization, setUser } from './action';
import { Offers, Offer } from '../types/offer';
import { Reviews } from '../types/review';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';


export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUser(data));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

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

