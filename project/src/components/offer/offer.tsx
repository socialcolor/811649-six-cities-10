import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import { Hotel } from '../../types/hotel';
type OfferProps = {
  offer: Hotel;
}

export default function Offer({offer}: OfferProps): JSX.Element {

  function calcRating(rating:number): string {
    const percentOneStar = 20;
    return `${(percentOneStar * Math.round(rating)).toString()}%`;
  }

  return (
    <article className="cities__card place-card">
      <div className="place-card__mark">
        {offer.isPremium ? <span>Premium</span> : null}
      </div>
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
