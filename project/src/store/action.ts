import { createAction } from '@reduxjs/toolkit';
import { Offer, City } from '../types/offer';
import { Review } from '../types/review';

export const setOffers = createAction<Offer[]>('setOffers');
export const changeCity = createAction<City>('changeCity');
export const changeActiveSort = createAction<string>('changeActiveSort');
export const setDataLoadedStatus = createAction<boolean>('setDataLoadedStatus');
export const setComment = createAction<Review[]>('setComment');
export const setPropertyOffer = createAction<Offer>('setPropertyOffer');
export const setNearbyOffers = createAction<Offer[]>('setNearbyOffers');
