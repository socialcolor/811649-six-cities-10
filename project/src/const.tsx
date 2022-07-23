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

const enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Admsterdam = 'Admsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}
export {AppRoute, AuthorizationStatus, ACTIVE_OFFER_ID, Cities};
