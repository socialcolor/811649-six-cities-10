import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {AuthorizationStatus} from '../src/const';
import {offers} from './mocks/offers';

const Settings = {
  OFFERS_COUNT: 5,
  authorizationStatus: AuthorizationStatus.Auth,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App offersCount = {Settings.OFFERS_COUNT} offers={offers} authorizationStatus = {Settings.authorizationStatus} />
  </React.StrictMode>,
);
