import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute, AuthorizationStatus, City } from '../../const';
import MainEpmtyScreen from './main-empty-screen';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: MainScreen', () => {
  it('should render No place', () => {
    history.push('/main-empty-screen');
    const store = mockStore({
      FILTER: {
        city: City.Paris,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
      }
    });
    const authorizationStatus = AuthorizationStatus.NoAuth;
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.MainEmptyScreen} element={<MainEpmtyScreen authorizationStatus={authorizationStatus} />} />
          </Routes>
        </HistoryRouter>,
      </Provider>
    );

    const city = screen.getByText('No places to stay available');

    expect(city).toBeInTheDocument();
  });

});
