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

const cities = {
  amsterdam: {
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 12
    }
  }
};

const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';


export { AppRoute, AuthorizationStatus, ACTIVE_OFFER_ID, cities, URL_MARKER_DEFAULT, URL_MARKER_CURRENT };
