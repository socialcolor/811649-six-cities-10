import {store} from '../store/index';
import { Offer, City } from './offer';
import { Reviews } from './review';
import {FormError} from './form-error';
import { AuthorizationStatus } from '../const';
import { UserData } from './user-data';

export type OffersData = {
  offers: Offer[],
  propertyOffer: Offer | null,
  isDataLoaded: boolean,
  comment: Reviews | null,
  nearbyOffers: Offer[];
  formError: FormError;
};

export type UserProcess = {
  user: UserData | null;
  authorizationStatus: AuthorizationStatus;
  formLoginError: string | null | undefined;
};

export type FilterProcess = {
  city: City;
  currentSort: string;
}

export type FavoriteProcess = {
  favorite: Offer[] | [];
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
