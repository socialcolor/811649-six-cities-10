import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import { AuthorizationStatus } from '../src/const';
// import { offers } from './mocks/offers';
import {store} from './store';
// import { setOffers } from './store/action';
import { fetchLoadOffersAction } from './store/api-actions';

const Settings = {
  authorizationStatus: AuthorizationStatus.Auth,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(fetchLoadOffersAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App authorizationStatus={Settings.authorizationStatus} />
    </Provider>
  </React.StrictMode>,
);
