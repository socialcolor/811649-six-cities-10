import {useState} from 'react';
import {ACTIVE_OFFER_ID} from '../../const';
import Offer from '../offer/offer';
import { Hotels } from '../../types/hotel';

type OfferListProps = {
  offers: Hotels;
}

export default function OffersList({offers}: OfferListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeOffer, setActiveOffer] = useState(ACTIVE_OFFER_ID);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">312 places to stay in Amsterdam</b>
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
        {offers.map((offer) => <Offer key={offer.id} offer={offer} />)}
      </div>
    </section>
  );
}
