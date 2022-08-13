import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Navigate } from 'react-router-dom';
import { Offers, Offer } from '../../types/offer';
import { calcRating } from '../../utils';
import { review } from '../../mocks/review';
import Header from '../../components/header/header';
import Review from '../../components/review/review';
import SendCommentForm from '../../components/send-comment-form/send-comment-form';
import Map from '../../components/map/map';
import NearPlaces from '../../components/near-places/near-places';

type PropertyScreenProps = {
  authorizationStatus: string;
  offers: Offers;
}

export default function PropertyScreen({ authorizationStatus, offers }: PropertyScreenProps): JSX.Element {
  const params = useParams();
  const currentOfferId = Number(params.id);
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const offer = offers.find((element) => element.id === currentOfferId);
  const currentOfferIndex = offers.findIndex((element) => element.id === currentOfferId);
  const nearOffers = [...offers.slice(0, currentOfferIndex), ...offers.slice(currentOfferIndex + 1)];

  const onOfferHover = (hoveredOffer: Offer) => {
    setActiveOffer(hoveredOffer);
  };

  const onOutOfOffer = () => {
    setActiveOffer(null);
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
              {offer.images.slice(0, 6).map((img) => (
                <div key={img} className="property__image-wrapper">
                  <img className="property__image" src={img} alt="studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                {offer.isPremium && <span>Premium</span>}
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">{offer.title}</h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: calcRating(offer.rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((good) => <li key={good} className="property__inside-item">{good}</li>)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={offer.host.isPro ? 'property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper' : 'property__avatar-wrapper'}>
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{review.length}</span></h2>
                {review.map((comment) => <Review key={`${comment.date}-${comment.id}`} review={comment} />)}
                <SendCommentForm />
              </section>
            </div>
          </div>
          <Map offers={nearOffers} activeOffer={activeOffer} size={{ width: '100%', height: '579px' }} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffers.map((nearOffer) => <NearPlaces key={nearOffer.id} offer={nearOffer} onOfferHover={onOfferHover} onOutOfOffer={onOutOfOffer}/>)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
