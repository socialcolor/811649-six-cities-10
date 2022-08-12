import { createAction } from '@reduxjs/toolkit';
import { Hotel } from '../types/hotel';

const setOffers = createAction<Hotel[]>('setOffers');

const chenageCity = createAction<string>('changeCity');

export {setOffers, chenageCity};
