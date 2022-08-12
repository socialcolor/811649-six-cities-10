import {State} from '../types/state';

const getOffers = () => (state: State) => state.offers.filter((offer) => offer.city.name === state.city.name);

const getFavoriteOffers = () => (state: State) => state.offers.filter((offer) => offer.isFavorite);

const getCurrentCity = () => (state: State) => state.city.name;

export {getOffers, getCurrentCity, getFavoriteOffers};
