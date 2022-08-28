
import { Offer } from '../../types/offer';
import Header from '../../components/header/header';
import OfferList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import { MouseEvent, useCallback, useState } from 'react';
import { getOffers } from '../../store/offers-data/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { City } from '../../const';
import { changeCity } from '../../store/filter-process/filter-process';
import { getCurrentCityName } from '../../store/filter-process/selectors';

type MainScreenProps = {
  authorizationStatus: string;
}

export default function MainScreen({ authorizationStatus }: MainScreenProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const currentCityName = useAppSelector(getCurrentCityName());
  const offers = useAppSelector(getOffers(currentCityName));

  const onOfferHover = useCallback((offer: Offer) => setActiveOffer(offer), []);

  const onOutOfOffer = useCallback(() => setActiveOffer(null), []);

  const onCitiesClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const cityName = evt.currentTarget.dataset.city;
    if (cityName) {
      dispatch(changeCity(cityName));
    }
  };

  return (
    <div className="page page--gray page--main">

      <Header authorizationStatus={authorizationStatus} />

      <main className={offers.length ? 'page__main page__main--index' : 'page__main page__main--index page__main--index-empty'}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {Object.keys(City).map((name) => (
                <li key={name} className="locations__item">
                  <a className={currentCityName === name ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link'} data-city={name} onClick={onCitiesClick} href="/#">
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          {offers.length ?
            <div className="cities__places-container container">
              <OfferList offers={offers} currentCityName={currentCityName} onOfferHover={onOfferHover} onOutOfOffer={onOutOfOffer} />
              <div className="cities__right-section">
                <Map offers={offers} activeOffer={activeOffer} size={{ width: '100%', height: '100%' }} />
              </div>
            </div>
            :
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>}
        </div>
      </main>
    </div>
  );
}
