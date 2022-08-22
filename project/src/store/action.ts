import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { Offer, City } from '../types/offer';
import { UserData } from '../types/user-data';
import { Review } from '../types/review';

export const setOffers = createAction<Offer[]>('setOffers');
export const changeCity = createAction<City>('changeCity');
export const changeActiveSort = createAction<string>('changeActiveSort');
export const setDataLoadedStatus = createAction<boolean>('setDataLoadedStatus');
export const setComment = createAction<Review[]>('setComment');
export const setPropertyOffer = createAction<Offer>('setPropertyOffer');
export const setNearbyOffers = createAction<Offer[]>('setNearbyOffers');
export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
export const setUser = createAction<UserData>('setUser');
export const redirectNotFound = createAction<AppRoute>('redirectNotFound');
