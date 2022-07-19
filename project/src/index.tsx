import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {AuthorizationStatus} from '../src/const';

const Settings = {
  PLACES_COUNT: 5,
  authorizationStatus: AuthorizationStatus.NoAuth,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App placesCount = {Settings.PLACES_COUNT} authorizationStatus = {Settings.authorizationStatus} />
  </React.StrictMode>,
);
