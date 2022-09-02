import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AuthorizationStatus, City, SortName } from '../../const';
import { makeFakerOffer } from '../../mock';
import HistoryRouter from '../history-router/history-router';
import OffersList from './offers-list';

const offers = [makeFakerOffer()];
const history = createMemoryHistory();
const makeStore = configureMockStore();
describe('Component: Offer List', () => {
  it('City name', () => {
    const store = makeStore({
      FILTER: {
        city: City.Paris,
        currentSort: SortName.Popular,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      }
    });
    const onOfferHover = jest.fn();
    const onOutOfOffer = jest.fn();
    render(
      <Provider store={store} >
        <HistoryRouter history={history}>
          <Routes>
            <Route path='/' element={<OffersList offers={offers} currentCityName={City.Paris.name} onOfferHover={onOfferHover} onOutOfOffer={onOutOfOffer} />} />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(`${offers.length} places to stay in ${City.Paris.name}`)).toBeInTheDocument();
  });
});
