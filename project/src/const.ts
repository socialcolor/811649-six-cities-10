import { CityNameType } from './types/city-name';

const enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFoundScreen = '/notfoundscreen',
  MainEmptyScreen = '/main-empty-screen',
  Other = '*',
}

const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const SortName = {
  Popular: 'Popular',
  LowToHigh: 'LowToHigh',
  HighToLow: 'HighToLow',
  Top: 'Top',
};

const SortTitles = {
  [SortName.Popular]: 'Popular',
  [SortName.LowToHigh]: 'Price: low to high',
  [SortName.HighToLow]: 'Price: high to low',
  [SortName.Top]: 'Top rated first',
};

const City: CityNameType = {
  Paris: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    }
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    }
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    }
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    }
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    }
  }
};

const URL_MARKER_DEFAULT = '/img/pin.svg';

const URL_MARKER_CURRENT = '/img/pin-active.svg';

enum APIRoute {
  Offers = '/hotels',
  Offer = '/hotels/:id',
  Comment = '/comments/:id',
  Nearby = '/hotels/:id/nearby',
  Favorite = '/favorite',
  Login = '/login',
  Logout = '/logout',
}

const LabelTitle: {
  [index: string]: string;
} = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect',
};

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
  Filter = 'FILTER',
  Favorite = 'FAVORITE',
}

export { AppRoute, AuthorizationStatus, SortName, SortTitles, City, URL_MARKER_DEFAULT, URL_MARKER_CURRENT, APIRoute, LabelTitle };
