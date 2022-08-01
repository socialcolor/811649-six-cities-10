import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Hotel } from '../../types/hotel';
import { calcRating } from '../../utils';
import { MouseEvent } from 'react';

type NearPlacesProps = {
  offer: Hotel
  onOfferHover: (offer: Hotel) => void;
}
export default function NearPlaces({ offer, onOfferHover }: NearPlacesProps): JSX.Element {
  const offerHoverHandler = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (onOfferHover) {
      onOfferHover(offer);
    }
  };

  return (
    <article className="near-places__card place-card" onMouseEnter={offerHoverHandler}>
      {offer.isPremium ? <div className="place-card__mark"><span>Premium</span></div> : null}
      <div className="near-places__image-wrapper place-card__image-wrapper">
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
          <button className={offer.isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: calcRating(offer.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Room.replace(':id', (offer.id).toString())}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
