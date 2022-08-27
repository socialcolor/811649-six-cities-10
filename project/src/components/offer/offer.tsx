import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offer as OfferType } from '../../types/offer';
import { calcRating } from '../../utils';
import { memo, MouseEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchChangeFavorite } from '../../store/api-actions';
import { getAuthStatus } from '../../store/user-process/selectors';
import { changeFavoriteOffer } from '../../store/offers-data/offers-data';

type OfferProps = {
  offer: OfferType;
  onOfferHover?: (offer: OfferType) => void;
  onOutOfOffer?: () => void;
}

function Offer({ offer, onOfferHover, onOutOfOffer }: OfferProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthStatus());
  const navigate = useNavigate();

  const offerHoverHandler = useCallback((event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (onOfferHover) {
      onOfferHover(offer);
    }
  }, [offer, onOfferHover]);

  const outOfOfferHandler = useCallback(() => {
    if (onOutOfOffer) {
      onOutOfOffer();
    }
  }, [onOutOfOffer]);

  const favoiteClickHandler = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchChangeFavorite({ id: offer.id, isFavorite: +!offer.isFavorite }));
      dispatch(changeFavoriteOffer(offer.id));
    } else {
      navigate(AppRoute.Login);
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
          <button className={offer.isFavorite ? 'place-card__bookmark-button button place-card__bookmark-button--active' : 'place-card__bookmark-button button'} type="button" onClick={favoiteClickHandler}>
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

export default memo(Offer);
