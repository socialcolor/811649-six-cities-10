import {Offers} from '../../types/offer';
import Offer from '../../components/offer/offer';

type favoritesListprops = {
  offers: Offers;
  name: string;
}
export default function FavoritesList({offers, name}: favoritesListprops): JSX.Element {
  return (
    <ul className="favorites__list">
      <li className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="/#">
              <span>{name}</span>
            </a>
          </div>
        </div>
        <div className="favorites__places">
          {offers.map((offer) => <Offer key={offer.id} offer={offer}/>)}
        </div>
      </li>
    </ul>
  );
}
