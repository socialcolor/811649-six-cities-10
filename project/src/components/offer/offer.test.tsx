import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { APIRoute, AuthorizationStatus } from '../../const';
import { makeFakerOffer } from '../../mock';
import HistoryRouter from '../history-router/history-router';
import Offers from './offer';

const offer = makeFakerOffer();
const makeStore = configureMockStore();
const history = createMemoryHistory();
describe('Component: Offer', () => {
  it('Offer title', () => {
    history.push(APIRoute.Offer);
    const store = makeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth
      }
    });
    const onOfferHover = jest.fn();
    const onOutOfOffer = jest.fn();
    render(
      <Provider store={store} >
        <HistoryRouter history={history}>
          <Routes>
            <Route path={APIRoute.Offer} element={<Offers offer={offer} onOfferHover={onOfferHover} onOutOfOffer={onOutOfOffer} />}>
            </Route>
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
  });
});
