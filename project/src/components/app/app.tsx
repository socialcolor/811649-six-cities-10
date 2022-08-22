import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import IconArrowSelected from '../icon-arrow-select/icon-arrow-select';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthStatus, getDataLoaded, getFavoriteOffers } from '../../store/selectors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { fetchLoadOffersAction } from '../../store/api-actions';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';


export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLoadOffersAction());
  }, [dispatch]);

  const authorizationStatus = useAppSelector(getAuthStatus());
  const favoritesOffers = useAppSelector(getFavoriteOffers());
  const isDataLoaded = useAppSelector(getDataLoaded());

  if (isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <React.Fragment>
      <IconArrowSelected />
      <HistoryRouter history={browserHistory}>

        <ScrollToTop />
        <Routes>
          <Route path={AppRoute.Root} element={<MainScreen authorizationStatus={authorizationStatus} />} />
          <Route path={AppRoute.Login} element={<LoginScreen />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesScreen authorizationStatus={authorizationStatus} offers={favoritesOffers} />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Room} element={<PropertyScreen authorizationStatus={authorizationStatus} />} />
          <Route path={AppRoute.NotFoundScreen} element={<NotFoundScreen authorizationStatus={authorizationStatus} />} />
          <Route path="*" element={<NotFoundScreen authorizationStatus={authorizationStatus} />} />
        </Routes>
      </HistoryRouter>

    </React.Fragment>
  );
}
