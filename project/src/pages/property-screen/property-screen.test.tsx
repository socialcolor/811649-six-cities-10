
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../../components/history-router/history-router';
import { AuthorizationStatus, City, SortName } from '../../const';
import { makeFakerOffer } from '../../mock';
import PropertyScreen from './property-screen';

const history = createMemoryHistory();
const offer = makeFakerOffer();
const nerby = makeFakerOffer();
const propertyOffer = makeFakerOffer();
const makeStore = configureMockStore();
describe('Component: property screen', () => {
  it('Title', () => {
    history.push('/offer');
    const store = makeStore({
      DATA: {
        offers: [offer],
        propertyOffer: propertyOffer,
        nearbyOffers: [nerby],
      },
      FILTER: {
        city: City.Paris,
        currentSort: SortName.Popular,
      },
      USER: {
        user: null,
        authorizationStatus: AuthorizationStatus.NoAuth,
        formLoginError: null,
      }
    });
    store.dispatch = jest.fn();

    const authorizationStatus = AuthorizationStatus.NoAuth;
    render(
      <Provider store={store} >
        <HistoryRouter history={history}>
          <Routes>
            <Route path={'/offer'} element={<PropertyScreen authorizationStatus={authorizationStatus} />} />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(propertyOffer.title)).toBeInTheDocument();
  });
});
