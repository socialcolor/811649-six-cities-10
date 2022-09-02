import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute, AuthorizationStatus, SortName } from '../../const';
import MainScreen from './main-screen';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import {makeFakerOffer} from '../../mock';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const offer = makeFakerOffer();

describe('Component: MainScreen', () => {
  it('should render place', () => {
    const offers = new Array(1).fill(null).map(() => offer);
    const store = mockStore({
      DATA: {
        offers: offers
      },
      FILTER: {
        city: offer.city,
        currentSort: SortName.Popular,
      },
      USER: {
        user: null,
        authorizationStatus: AuthorizationStatus.Unknown,
        formLoginError: null,
      }
    });
    const authorizationStatus = AuthorizationStatus.NoAuth;
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Root} element={<MainScreen authorizationStatus={authorizationStatus} />} />
          </Routes>
        </HistoryRouter>,
      </Provider>
    );

    const offersList = screen.getByText(new RegExp(`${offers.length} places to stay in ${offer.city.name}`, 'i'));

    expect(offersList).toBeInTheDocument();
  });
});
