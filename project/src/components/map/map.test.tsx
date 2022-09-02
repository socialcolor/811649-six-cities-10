import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { City } from '../../const';
import { makeFakerOffer } from '../../mock';
import HistoryRouter from '../history-router/history-router';
import Map from './map';

const offers = new Array(5).fill(null).map(() => makeFakerOffer());
const makeStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: map', () => {
  it('Map Rendered', () => {
    history.push('/map');
    const store = makeStore({
      FILTER: {
        city: City.Paris,
      }
    });


    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/map'
              element={<Map offers={offers} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Leaflet')).toBeInTheDocument();
  });
});
