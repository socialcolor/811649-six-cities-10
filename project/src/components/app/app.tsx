import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import IconArrowSelect from '../icon-arrow-select/icon-arrow-select';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { fetchLoadOffersAction } from '../../store/api-actions';
import { getAuthStatus } from '../../store/user-process/selectors';
import { getDataLoaded } from '../../store/offers-data/selectors';
import MainEpmtyScreen from '../../pages/main-empty-screen/main-empty-screen';
import PrivateRoute from '../private-route/private-route';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLoadOffersAction());
  }, [dispatch]);

  const authorizationStatus = useAppSelector(getAuthStatus());
  const isDataLoaded = useAppSelector(getDataLoaded());

  if (isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <React.Fragment>
      <IconArrowSelect />
      <ScrollToTop />
      <Routes>
        <Route path={AppRoute.Root} element={<MainScreen authorizationStatus={authorizationStatus} />} />
        <Route path={AppRoute.Login} element={<LoginScreen authorizationStatus={authorizationStatus} />} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <FavoritesScreen authorizationStatus={authorizationStatus} />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Room} element={<PropertyScreen authorizationStatus={authorizationStatus} />} />
        <Route path={AppRoute.NotFoundScreen} element={<NotFoundScreen authorizationStatus={authorizationStatus} />} />
        <Route path={AppRoute.MainEmptyScreen} element={<MainEpmtyScreen authorizationStatus={authorizationStatus} />} />
        <Route path={AppRoute.Other} element={<NotFoundScreen authorizationStatus={authorizationStatus} />} />
      </Routes>

    </React.Fragment>
  );
}
