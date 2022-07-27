import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {AuthorizationStatus} from '../src/const';
import {offers} from './mocks/offers';

const Settings = {
  authorizationStatus: AuthorizationStatus.Auth,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App offers={offers} authorizationStatus = {Settings.authorizationStatus} />
  </React.StrictMode>,
);
