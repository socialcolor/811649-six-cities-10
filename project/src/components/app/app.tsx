import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import IconArrowSelected from '../icon-arrow-select/icon-arrow-select';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';


type AppScreenProps = {
  placesCount: number;
  authorizationStatus: string;
}

export default function App({placesCount, authorizationStatus}: AppScreenProps): JSX.Element {
  return (
    <React.Fragment>
      <IconArrowSelected />

      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<MainScreen placesCount={placesCount} authorizationStatus={authorizationStatus} />} />
          <Route path={AppRoute.Login} element={<LoginScreen />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesScreen authorizationStatus={authorizationStatus} />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Room} element={<PropertyScreen authorizationStatus={authorizationStatus} />} />
          <Route path="*" element={<NotFoundScreen authorizationStatus={authorizationStatus} />} />
        </Routes>

      </BrowserRouter>

    </React.Fragment>
  );
}
