import {State} from '../types/state';

const getOffers = () => (state: State) => state.offers.filter((offer) => offer.city.name === state.city.name);

const getFavoriteOffers = () => (state: State) => state.offers.filter((offer) => offer.isFavorite);

const getCurrentCityName = () => (state: State) => state.city.name;

const getCurrentSortName = () => (state: State) => state.sort;

export {getOffers, getCurrentCityName, getFavoriteOffers, getCurrentSortName};
