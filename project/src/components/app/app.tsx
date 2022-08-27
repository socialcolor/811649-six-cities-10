import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import IconArrowSelected from '../icon-arrow-select/icon-arrow-select';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { fetchLoadOffersAction, fetchLoadFavoriteAction } from '../../store/api-actions';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getAuthStatus } from '../../store/user-process/selectors';
import { getDataLoaded } from '../../store/offers-data/selectors';
import MainEpmtyScreen from '../../pages/main-empty-screen/main-empty-screen';
import { getFavoriteOffers } from '../../store/favorite-process/selectors';

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLoadOffersAction());
    dispatch(fetchLoadFavoriteAction());
  }, [dispatch]);

  const authorizationStatus = useAppSelector(getAuthStatus());
  const isDataLoaded = useAppSelector(getDataLoaded());
  const offers = useAppSelector(getFavoriteOffers());
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
          <Route path={AppRoute.Login} element={<LoginScreen authorizationStatus={authorizationStatus} />} />
          <Route path={AppRoute.Favorites} element={<FavoritesScreen authorizationStatus={authorizationStatus} offers={offers} />} />
          <Route path={AppRoute.Room} element={<PropertyScreen authorizationStatus={authorizationStatus} />} />
          <Route path={AppRoute.NotFoundScreen} element={<NotFoundScreen authorizationStatus={authorizationStatus} />} />
          <Route path={AppRoute.MainEmptyScreen} element={<MainEpmtyScreen authorizationStatus={authorizationStatus} />} />
          <Route path="*" element={<NotFoundScreen authorizationStatus={authorizationStatus} />} />
        </Routes>
      </HistoryRouter>

    </React.Fragment>
  );
}
