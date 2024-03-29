import FavoritesList from '../../components/favorites-list/favorites-list';
import Header from '../../components/header/header';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks';
import { getFavoriteOffers } from '../../store/favorite-process/selectors';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useMemo } from 'react';

type FavoritesScreenProps = {
  authorizationStatus: string;
}
type AccType = {
  [key: string]: Offer[];
};

export default function FavoritesScreen({ authorizationStatus }: FavoritesScreenProps): JSX.Element {
  const offers: Offer[] = useAppSelector(getFavoriteOffers());

  const groupedOffers = useMemo(() => (offers.reduce<{ [key: string]: Offer[] }>((acc: AccType, offer: Offer) => {
    if (acc[offer.city.name]) {
      acc[offer.city.name].push(offer);
    } else {
      acc[offer.city.name] = [offer];
    }
    return acc;
  }, {})), [offers]);

  const cities = Object.keys(groupedOffers);

  return (
    <div className="page">
      <Header authorizationStatus={authorizationStatus} />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            {offers && <h1 className="favorites__title">Saved listing</h1> && cities.map((city) => <FavoritesList key={city} offers={groupedOffers[city]} name={city} />)}
            {!offers.length &&
              <>
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </>}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}
