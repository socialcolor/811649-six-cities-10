import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer as OfferType} from '../../types/offer';
import { calcRating } from '../../utils';
import { MouseEvent } from 'react';

type OfferProps = {
  offer: OfferType;
  onOfferHover?: (offer: OfferType) => void;
  onOutOfOffer?: () => void;
}

export default function Offer({ offer, onOfferHover, onOutOfOffer }: OfferProps): JSX.Element {
  const offerHoverHandler = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if(onOfferHover) {
      onOfferHover(offer);
    }
  };

  const outOfOfferHandler = () => {
    if(onOutOfOffer) {
      onOutOfOffer();
    }
  };

  return (
    <article className="cities__card place-card" onMouseEnter={offerHoverHandler} onMouseLeave={outOfOfferHandler}>
      {offer.isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.Room.replace(':id', (offer.id).toString())}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: calcRating(offer.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="/#">{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
