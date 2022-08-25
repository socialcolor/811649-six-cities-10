import Offer from '../offer/offer';
import { Offer as OfferType, Offers } from '../../types/offer';
import Sort from '../sort/sort';
import { memo } from 'react';

type OfferListProps = {
  offers: Offers;
  currentCityName: string;
  onOfferHover: (offer: OfferType) => void;
  onOutOfOffer: () => void;
}

function OffersList({offers, currentCityName, onOfferHover, onOutOfOffer}: OfferListProps): JSX.Element {

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{offers.length} places to stay in {currentCityName}</b>
      <Sort />
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => <Offer key={offer.id} offer={offer} onOfferHover={onOfferHover} onOutOfOffer={onOutOfOffer} />)}
      </div>
    </section>
  );
}

export default memo(OffersList);
