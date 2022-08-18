import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import { AuthorizationStatus } from '../src/const';
import {store} from './store';

const Settings = {
  authorizationStatus: AuthorizationStatus.Auth,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App authorizationStatus={Settings.authorizationStatus} />
    </Provider>
  </React.StrictMode>,
);
