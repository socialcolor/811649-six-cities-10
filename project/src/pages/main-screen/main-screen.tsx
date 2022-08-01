import {Hotel, Hotels } from '../../types/hotel';
import Header from '../../components/header/header';
import OfferList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import { useState } from 'react';

type MainScreenProps = {
  offers: Hotels;
  authorizationStatus: string;
}

export default function MainScreen({ offers, authorizationStatus }: MainScreenProps): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Hotel | null>(null);

  const onOfferHover = (offer: Hotel) => {
    setActiveOffer(offer);
  };

  return (
    <div className="page page--gray page--main">
      <Header authorizationStatus={authorizationStatus} />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="/#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="/#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="/#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active" href="/#">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="/#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="/#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <OfferList offers={offers} onOfferHover={onOfferHover} />
            <div className="cities__right-section">
              <Map offers={offers} activeOffer={activeOffer} size={{width:'100%', height: '100%'}} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
