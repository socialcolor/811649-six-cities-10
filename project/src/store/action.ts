import { createAction } from '@reduxjs/toolkit';
import { Offer, City } from '../types/offer';

const setOffers = createAction<Offer[]>('setOffers');

const chenageCity = createAction<City>('changeCity');

export {setOffers, chenageCity};
