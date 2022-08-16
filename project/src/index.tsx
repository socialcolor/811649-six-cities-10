import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import { AuthorizationStatus } from '../src/const';
import { offers } from './mocks/offers';
import {store} from './store';
import { setOffers, setSort } from './store/action';
import { ActiveSort } from './const';

const Settings = {
  authorizationStatus: AuthorizationStatus.Auth,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(setOffers(offers));
store.dispatch(setSort(ActiveSort.Popular));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App authorizationStatus={Settings.authorizationStatus} />
    </Provider>
  </React.StrictMode>,
);
