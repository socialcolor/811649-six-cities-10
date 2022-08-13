import Offer from '../offer/offer';
import { Offer as OfferType, Offers } from '../../types/offer';

type OfferListProps = {
  offers: Offers;
  currentCityName: string;
  onOfferHover: (offer: OfferType) => void;
  onOutOfOffer: () => void;
}

export default function OffersList({offers, currentCityName, onOfferHover, onOutOfOffer}: OfferListProps): JSX.Element {

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {currentCityName}</b>
      <form className="places__sorting" action="/#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0}>
          Popular
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options">
          <li className="places__option places__option--active" tabIndex={0}>Popular</li>
          <li className="places__option" tabIndex={0}>Price: low to high</li>
          <li className="places__option" tabIndex={0}>Price: high to low</li>
          <li className="places__option" tabIndex={0}>Top rated first</li>
        </ul>
      </form>
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => <Offer key={offer.id} offer={offer} onOfferHover={onOfferHover} onOutOfOffer={onOutOfOffer} />)}
      </div>
    </section>
  );
}
