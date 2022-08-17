import { createAction } from '@reduxjs/toolkit';
import { Offer, City } from '../types/offer';

const setOffers = createAction<Offer[]>('setOffers');
const changeCity = createAction<City>('changeCity');
const changeActiveSort = createAction<string>('changeActiveSort');

export {setOffers, changeCity, changeActiveSort};
