import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import HistoryRouter from '../history-router/history-router';
import Header from './header';
import { makeFakerOffer, makeFakeUser } from '../../mock';

const history = createMemoryHistory();
const makeStore = configureMockStore();
const userData = makeFakeUser();
const offers = makeFakerOffer();

describe('Component: user-name', () => {
  it('User Auth', () => {
    const store = makeStore({
      DATA: {
        offers: [offers],
      },
      USER: {
        user: userData,
      },
      FAVORITE: {
        favorite: [],
      }
    });
    store.dispatch = jest.fn();
    const authorizationStatus = AuthorizationStatus.Auth;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Root} element={<Header authorizationStatus={authorizationStatus} />} />
          </Routes>
        </HistoryRouter>,
      </Provider>
    );

    expect(screen.getByText(userData.email)).toBeInTheDocument();
  });

  it('User noAuth', () => {
    const store = makeStore({
      DATA: {
        offers: [offers],
      },
      USER: {
        user: userData,
      },
      FAVORITE: {
        favorite: [],
      }
    });
    store.dispatch = jest.fn();
    const authorizationStatus = AuthorizationStatus.NoAuth;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Root} element={<Header authorizationStatus={authorizationStatus} />} />
          </Routes>
        </HistoryRouter>,
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

});
