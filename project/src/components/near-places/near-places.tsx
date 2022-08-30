import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchChangeFavorite } from '../../store/api-actions';
import { changeFavoriteOffer, changeFavoriteNearbyOffers } from '../../store/offers-data/offers-data';
import {getAuthStatus} from '../../store/user-process/selectors';
import { Offer } from '../../types/offer';
import { calcRating } from '../../utils';

type NearPlacesProps = {
  offer: Offer
}
export default function NearPlaces({ offer }: NearPlacesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthStatus());
  const navigate = useNavigate();

  const onFavoriteClickHandler = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchChangeFavorite({ id: offer.id, isFavorite: !offer.isFavorite }));
      dispatch(changeFavoriteOffer(offer.id));
      dispatch(changeFavoriteNearbyOffers(offer.id));
    } else {
      navigate(AppRoute.Login);
    }
  };
  return (
    <article className="near-places__card place-card">
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
          <button className={offer.isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button" onClick={onFavoriteClickHandler}>
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
