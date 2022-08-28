import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOffer, getComment, getNearbyOffers } from '../../store/offers-data/selectors';
import { calcRating } from '../../utils';
import Header from '../../components/header/header';
import Review from '../../components/review/review';
import SendCommentForm from '../../components/send-comment-form/send-comment-form';
import Map from '../../components/map/map';
import NearPlaces from '../../components/near-places/near-places';
import { fetchChangeFavorite, fetchLoadCommentAction, fetchLoadNearbyOfferAction, fetchLoadOfferAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../const';
import './property-screen.css';
import { changeFavoriteOffer, changeFavoritePropertyOffer } from '../../store/offers-data/offers-data';

type PropertyScreenProps = {
  authorizationStatus: string;
}

export default function PropertyScreen({ authorizationStatus }: PropertyScreenProps): JSX.Element {
  const params = useParams();
  const currentOfferId = Number(params.id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLoadOfferAction(currentOfferId));
    dispatch(fetchLoadCommentAction(currentOfferId));
    dispatch(fetchLoadNearbyOfferAction(currentOfferId));
  }, [dispatch, currentOfferId]);

  const offer = useAppSelector(getOffer());
  const review = useAppSelector(getComment());
  const nearOffers = useAppSelector(getNearbyOffers());
  // const onOutOfOffer = () => {
  //   setActiveOffer(null);
  // };

  // const onOfferHover = (hoveredOffer: Offer) => {
  //   setActiveOffer(hoveredOffer);
  // };

  const favoiteClickHandler = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      if (offer) {
        dispatch(fetchChangeFavorite({ id: offer.id, isFavorite: !offer.isFavorite }));
        dispatch(changeFavoriteOffer(offer.id));
        dispatch(changeFavoritePropertyOffer());
      }
    } else {
      navigate(AppRoute.Login);
    }
  };

  if (offer === undefined) {
    return <Navigate to={AppRoute.NotFoundScreen} />;
  }

  return (
    <div className="page">
      <Header authorizationStatus={authorizationStatus} />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer && offer.images && offer.images.map((img) => (
                <div key={img} className="property__image-wrapper">
                  <img className="property__image" src={img} alt="studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer && offer.isPremium && <div className="property__mark"><span>Premium</span></div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">{offer && offer.title}</h1>
                <button className={offer && offer.isFavorite ? 'property__bookmark-button button property__bookmark-button--active' : 'property__bookmark-button button'} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33" onClick={favoiteClickHandler}>
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  {offer && <span style={{ width: calcRating(offer.rating) }}></span>}
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer && offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer && offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer && offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer && offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer && offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer && offer.goods && offer.goods.map((good) => <li key={good} className="property__inside-item">{good}</li>)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={offer && offer.host && offer.host.isPro ? 'property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper' : 'property__avatar-wrapper'}>
                    {offer && <img className="property__avatar user__avatar" src={offer.host && offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />}
                  </div>
                  <span className="property__user-name">
                    {offer && offer.host && offer.host.name}
                  </span>
                  {offer && offer.host && offer.host.isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer && offer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                {review && <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{review.length}</span></h2>}
                {review && review.map((comment) => <Review key={`${comment.date}-${comment.id}`} review={comment} />)}
                {authorizationStatus === AuthorizationStatus.Auth && <SendCommentForm offerId={currentOfferId} />}
              </section>
            </div>
          </div>
          <Map offers={nearOffers} size={{ width: '100%', height: '579px' }} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffers.map((nearOffer) => <NearPlaces key={nearOffer.id} offer={nearOffer} />)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
