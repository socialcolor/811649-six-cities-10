import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { AuthorizationStatus } from '../../const';
import NotFoundScreen from './not-found-screen';

describe('Component: NotFoundScreen', () => {
  it('should render NotFoundScreen', () => {
    const history = createMemoryHistory();
    const authorizationStatus = AuthorizationStatus.NoAuth;
    render(
      <HistoryRouter history={history}>
        <NotFoundScreen authorizationStatus={authorizationStatus} />
      </HistoryRouter>,
    );

    const headerElement = screen.getByText('404. Not Found Pages');

    expect(headerElement).toBeInTheDocument();
  });
});
