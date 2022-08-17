import { createAction } from '@reduxjs/toolkit';
import { Offer, City } from '../types/offer';

const setOffers = createAction<Offer[]>('setOffers');
const chenageCity = createAction<City>('changeCity');
const changeActiveSort = createAction<string>('changeActiveSort');

export {setOffers, chenageCity, changeActiveSort};
