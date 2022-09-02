import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../history-router/history-router';
import Logout from './logout';

const history = createMemoryHistory();
describe('Component: logout', () => {
  it('Sign in', () => {
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path='/' element={<Logout />} />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });


});
