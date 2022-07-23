const ACTIVE_OFFER_ID = 0;

const enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id'
}

const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export {AppRoute, AuthorizationStatus, ACTIVE_OFFER_ID};
