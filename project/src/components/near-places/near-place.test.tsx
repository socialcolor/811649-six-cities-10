import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { APIRoute, AuthorizationStatus } from '../../const';
import { makeFakerOffer } from '../../mock';
import HistoryRouter from '../history-router/history-router';
import NearPlaces from './near-places';

const offer = makeFakerOffer();
const makeStore = configureMockStore();
const history = createMemoryHistory();
describe('Component: Near Places', () => {
  it('Offer title', () => {
    history.push(APIRoute.Offer);
    const store = makeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth
      }
    });

    render(
      <Provider store={store} >
        <HistoryRouter history={history}>
          <Routes>
            <Route path={APIRoute.Offer} element={<NearPlaces offer={offer} />}>
            </Route>
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
  });
});
