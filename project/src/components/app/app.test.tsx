import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import { AuthorizationStatus, AppRoute, SortName, City } from '../../const';
import App from './app';
import { makeFakerOffer, makeFakeUser } from '../../mock';

const mockStore = configureMockStore();
const offer = makeFakerOffer();
const propertyOffer = makeFakerOffer();
const offers = new Array(1).fill(null).map(() => offer);
const nerby = makeFakerOffer();
const userData = makeFakeUser();
const store = mockStore({
  DATA: {
    offers: offers,
    propertyOffer: propertyOffer,
    nearbyOffers: [nerby],
  },
  FILTER: {
    city: City.Paris,
    currentSort: SortName.Popular,
  },
  FAVORITE: {
    favorite: [],
  },
  USER: {
    user: userData,
    authorizationStatus: AuthorizationStatus.NoAuth,
    formLoginError: null,
  }
});
store.dispatch = jest.fn();
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(new RegExp(`${offers.length} places to stay in ${offer.city.name}`, 'i'))).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/Login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    const email = screen.getByText(/E-mail/i);
    const password = screen.getByText(/Password/i);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it('should redirect from "Favorite" to Login when user noAut', () => {
    history.push(AppRoute.Favorites);

    render(fakeApp);

    const email = screen.getByText(/E-mail/i);
    const password = screen.getByText(/Password/i);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it('should render "Property-Screen" when user navigate to /Room', () => {
    history.push(AppRoute.Room);

    render(fakeApp);

    expect(screen.getByText(propertyOffer.title)).toBeInTheDocument();
  });

  it('should render NotFoundScreen', () => {
    history.push(AppRoute.NotFoundScreen);

    render(fakeApp);

    expect(screen.getByText('404. Not Found Pages')).toBeInTheDocument();
  });

  it('should render Main Empty screen', () => {
    history.push(AppRoute.MainEmptyScreen);

    render(fakeApp);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });


  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404. Not Found Pages')).toBeInTheDocument();
  });

});
