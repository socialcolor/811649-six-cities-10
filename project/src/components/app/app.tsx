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
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top';
import { useAppSelector } from '../../hooks';
import { getOffers, getFavoriteOffers } from '../../store/selectors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type AppScreenProps = {
  authorizationStatus: string;
}

export default function App({ authorizationStatus}: AppScreenProps): JSX.Element {
  const offers = useAppSelector(getOffers());
  const favoritesOffers = useAppSelector(getFavoriteOffers());
  const isDataLoaded = useAppSelector((state) => state.isDataLoaded);

  if (isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <React.Fragment>
      <IconArrowSelected />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={AppRoute.Root} element={<MainScreen authorizationStatus={authorizationStatus}/>} />
          <Route path={AppRoute.Login} element={<LoginScreen />} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesScreen authorizationStatus={authorizationStatus} offers={favoritesOffers}/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Room} element={<PropertyScreen authorizationStatus={authorizationStatus} offers={offers}/>} />
          <Route path={AppRoute.NotFoundScreen} element={<NotFoundScreen authorizationStatus={authorizationStatus} />} />
          <Route path="*" element={<NotFoundScreen authorizationStatus={authorizationStatus} />} />
        </Routes>

      </BrowserRouter>

    </React.Fragment>
  );
}
