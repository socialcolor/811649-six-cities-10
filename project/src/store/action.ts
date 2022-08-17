import { createAction } from '@reduxjs/toolkit';
import { Offer, City } from '../types/offer';
import { Review } from '../types/review';

const setOffers = createAction<Offer[]>('setOffers');
const changeCity = createAction<City>('changeCity');
const changeActiveSort = createAction<string>('changeActiveSort');
const setDataLoadedStatus = createAction<boolean>('setDataLoadedStatus');
const setComment = createAction<Review[]>('setComment');
export {setOffers, changeCity, changeActiveSort, setDataLoadedStatus, setComment};
