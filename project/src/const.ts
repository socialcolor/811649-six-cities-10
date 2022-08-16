
const ACTIVE_OFFER_ID = 0;

const enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFoundScreen = '/NotFoundScreen',
}

const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const ActiveSort = {
  Popular: 'Popular',
  LowToHigh: 'Price: low to high',
  HighToLow: 'Price: high to low',
  TOP: 'Top rated first',
} as const;

const city = {
  name: 'Amsterdam',
  location: {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 13,
  }
};

const zoom = 12;

const URL_MARKER_DEFAULT = '/img/pin.svg';

const URL_MARKER_CURRENT = '/img/pin-active.svg';


export { AppRoute, AuthorizationStatus, ActiveSort, ACTIVE_OFFER_ID, city, URL_MARKER_DEFAULT, URL_MARKER_CURRENT, zoom };
