import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const Settings = {
  PLACES_COUNT: 5,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App placesCount = {Settings.PLACES_COUNT}/>
  </React.StrictMode>,
);
