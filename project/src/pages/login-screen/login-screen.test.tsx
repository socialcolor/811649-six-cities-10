import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute, AuthorizationStatus } from '../../const';
import LoginScreen from './login-screen';
import { Route, Routes } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: Login', () => {
  it('should render Login', () => {
    const store = mockStore({
      USER: {formLoginError: null},
    });
    const authorizationStatus = AuthorizationStatus.NoAuth;
    history.push('/login');
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path={AppRoute.Login} element={<LoginScreen authorizationStatus={authorizationStatus} />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    const email = screen.getByText(/E-mail/i);
    const password = screen.getByText(/Password/i);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });
});
