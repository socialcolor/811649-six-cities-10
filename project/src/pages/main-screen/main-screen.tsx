
import { Offer } from '../../types/offer';
import Header from '../../components/header/header';
import OfferList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import { MouseEvent, useCallback, useState } from 'react';
import { getOffers, getCurrentCityName } from '../../store/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { city } from '../../const';
import { changeCity } from '../../store/action';

type MainScreenProps = {
  authorizationStatus: string;
}

export default function MainScreen({ authorizationStatus }: MainScreenProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [activeOffer, setActiveOffer] = useState<Offer | null>(null);
  const offers = useAppSelector(getOffers());
  const currentCityName = useAppSelector(getCurrentCityName());

  const onOfferHover = useCallback((offer: Offer) => setActiveOffer(offer), []);

  const onOutOfOffer = useCallback(() => setActiveOffer(null), []);

  const onCitiesClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const cityName = evt.currentTarget.dataset.city;
    if(cityName) {
      dispatch(changeCity(cityName));
    }
  };

  return (
    <div className="page page--gray page--main">

      <Header authorizationStatus={authorizationStatus} />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {Object.keys(city).map((name) => (
                <li key={name} className="locations__item">
                  <a className={currentCityName === name ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link' } data-city={name} onClick={onCitiesClick} href="/#">
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <OfferList offers={offers} currentCityName={currentCityName} onOfferHover={onOfferHover} onOutOfOffer={onOutOfOffer} />
            <div className="cities__right-section">
              <Map offers={offers} activeOffer={activeOffer} size={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
