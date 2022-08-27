import FavoritesList from '../../components/favorites-list/favorites-list';
import Header from '../../components/header/header';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offer } from '../../types/offer';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
import { getFavoriteOffers } from '../../store/favorite-process/selectors';

type FavoritesScreenProps = {
  authorizationStatus: string;
}
type AccType = {
  [key: string]: Offer[];
};

export default function FavoritesScreen({ authorizationStatus }: FavoritesScreenProps): JSX.Element {
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Root);
    }
  }, [authorizationStatus, navigate]);

  const offers: Offer[] = useAppSelector(getFavoriteOffers());

  const dict = offers.reduce<{ [key: string]: Offer[] }>((acc: AccType, offer: Offer) => {
    if (acc[offer.city.name]) {
      acc[offer.city.name].push(offer);
    } else {
      acc[offer.city.name] = [offer];
    }
    return acc;
  }, {});

  const cities = Object.keys(dict);

  return (
    <div className="page">
      <Header authorizationStatus={authorizationStatus} />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {cities.map((city) => <FavoritesList key={city} offers={dict[city]} name={city} />)}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}
