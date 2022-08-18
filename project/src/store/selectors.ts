import {State} from '../types/state';

export const getOffers = () => (state: State) => state.offers.filter((offer) => offer.city.name === state.city.name);
export const getOffer = () => (state: State) => state.propertyOffer;
export const getComment = () => (state: State) => state.comment;
export const getNearbyOffers = () => (state: State) => state.nearbyOffers;
export const getFavoriteOffers = () => (state: State) => state.offers.filter((offer) => offer.isFavorite);
export const getCurrentCityName = () => (state: State) => state.city.name;
export const getCurrentSortName = () => (state: State) => state.currentSort;
