
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AuthorizationStatus, City } from '../../const';
import { makeFakerOffer } from '../../mock';
import HistoryRouter from '../history-router/history-router';
import FavoritesList from './favorites-list';

const history = createMemoryHistory();
const offers = [makeFakerOffer()];
const makeStore = configureMockStore();

describe('Component: Favorite list', () => {
  it('rendered Favorites', () => {
    const store = makeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      }
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path='/' element={<FavoritesList offers={offers} name={City.Paris.name} />} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(City.Paris.name)).toBeInTheDocument();
  });
});
