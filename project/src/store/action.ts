import { createAction } from '@reduxjs/toolkit';
import { Offer, City } from '../types/offer';

const setOffers = createAction<Offer[]>('setOffers');
const chenageCity = createAction<City>('changeCity');
const setSort = createAction<string>('setSort');
const changeSort = createAction<{sort: string, offers: Offer[]}>('changeSort');

export {setOffers, chenageCity, setSort, changeSort};
