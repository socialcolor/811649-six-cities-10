import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { makeFakerOffer, makeFakeUser } from '../../mock';
import HistoryRouter from '../history-router/history-router';
import Login from './login';

const offers = makeFakerOffer();
const userData = makeFakeUser();
const makeStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Login', () => {
  it('User name', () => {
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

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path='/' element={<Login />} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(userData.email)).toBeInTheDocument();
  });
});
