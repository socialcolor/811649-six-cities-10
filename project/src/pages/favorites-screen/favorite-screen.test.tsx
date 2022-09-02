import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute, AuthorizationStatus } from '../../const';
import FavoriteScreen from './favorites-screen';
import { makeFakerOffer, makeFakeUser } from '../../mock';
import { Route, Routes } from 'react-router-dom';


const mockStore = configureMockStore();
const history = createMemoryHistory();

const offers = makeFakerOffer();

describe('Component: Favorite', () => {
  it('No favorite', () => {
    const store = mockStore({
      DATA: {
        offers: [offers],
      },
      USER: {
        user: makeFakeUser(),
      },
      FAVORITE: {
        favorite: [offers],
      }
    });
    store.dispatch = jest.fn();

    const authorizationStatus = AuthorizationStatus.Auth;
    history.push('/favorites');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Favorites} element={<FavoriteScreen authorizationStatus={authorizationStatus} />} />
          </Routes>
        </HistoryRouter>,
      </Provider>
    );

    expect(screen.getByText(offers.city.name)).toBeInTheDocument();

  });
});
