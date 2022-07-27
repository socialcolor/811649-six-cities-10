import FavoritesList from '../../components/favorites-list/favorites-list';
import Header from '../../components/header/header';
import { Hotels, Hotel } from '../../types/hotel';

type FavoritesScreenProps = {
  authorizationStatus: string;
  offers: Hotels;
}

export default function FavoritesScreen({ authorizationStatus, offers }: FavoritesScreenProps): JSX.Element {
  type city = {
    [name: string]: Hotels;
  }

  const dict = offers.reduce((acc:city, offer: Hotel): city => {
    if(offer.isFavorite && acc[offer.city.name] === undefined) {
      acc[offer.city.name] = [offer];
    } else if(offer.isFavorite) {
      acc[offer.city.name].push(offer);
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
            {cities.map((city) => <FavoritesList key={city} offers={dict[city]} name={city}/>)}
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
