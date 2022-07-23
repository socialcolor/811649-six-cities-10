import Header from '../../components/header/header';
import {Hotels} from '../../types/hotel';
import {Cities} from '../../const';
import FavoritesList from '../../components/favorites-list/favorites-list';

type FavoritesScreenProps = {
  authorizationStatus: string;
  offers: Hotels;
}

export default function FavoritesScreen({authorizationStatus, offers}: FavoritesScreenProps): JSX.Element {
  const parisFavorites = offers.filter((offer) => offer.city.name === Cities.Paris && offer.isFavorite);
  const cologneFavorites = offers.filter((offer) => offer.city.name === Cities.Cologne && offer.isFavorite);
  const brusselsFavorites = offers.filter((offer) => offer.city.name === Cities.Brussels && offer.isFavorite);
  const amsterdamFavorites = offers.filter((offer) => offer.city.name === Cities.Admsterdam && offer.isFavorite);
  const hamburgFavorites = offers.filter((offer) => offer.city.name === Cities.Hamburg && offer.isFavorite);
  const dusseldorfFavorites = offers.filter((offer) => offer.city.name === Cities.Dusseldorf && offer.isFavorite);

  return (
    <div className="page">
      <Header authorizationStatus={authorizationStatus} />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {parisFavorites.length ? <FavoritesList offers={parisFavorites} name={Cities.Paris} /> : null}
            {cologneFavorites.length ? <FavoritesList offers={cologneFavorites} name={Cities.Cologne} /> : null}
            {brusselsFavorites.length ? <FavoritesList offers={brusselsFavorites} name={Cities.Brussels} /> : null}
            {amsterdamFavorites.length ? <FavoritesList offers={amsterdamFavorites} name={Cities.Admsterdam} /> : null}
            {hamburgFavorites.length ? <FavoritesList offers={hamburgFavorites} name={Cities.Hamburg} /> : null}
            {dusseldorfFavorites.length ? <FavoritesList offers={dusseldorfFavorites} name={Cities.Dusseldorf} /> : null}
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
