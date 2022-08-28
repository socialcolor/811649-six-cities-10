import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getOffers = (cityName: string) => (state: State,) => state[NameSpace.Data].offers.filter((offer) => offer.city.name === cityName);
export const getOffer = () => (state: State) => state[NameSpace.Data].propertyOffer;
export const getComment = () => (state: State) => state[NameSpace.Data].comment;
export const getNearbyOffers = () => (state: State) => state[NameSpace.Data].nearbyOffers;
export const getDataLoaded = () => (state: State) => state[NameSpace.Data].isDataLoaded;
export const getFormsError = () => (state: State) => state[NameSpace.Data].formError;
