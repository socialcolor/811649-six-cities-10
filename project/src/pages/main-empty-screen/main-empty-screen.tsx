
import Header from '../../components/header/header';
import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, city } from '../../const';
import { changeCity } from '../../store/filter-process/filter-process';
import { getCurrentCityName } from '../../store/filter-process/selectors';
import { useNavigate } from 'react-router-dom';

type MainEpmtyScreenType = {
  authorizationStatus: string;
}

export default function MainEpmtyScreen({ authorizationStatus }: MainEpmtyScreenType): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCityName = useAppSelector(getCurrentCityName());
  const navigate = useNavigate();

  const onCitiesClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const cityName = evt.currentTarget.dataset.city;
    if (cityName) {
      dispatch(changeCity(cityName));
      navigate(AppRoute.Root);
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
                  <a className={currentCityName === name ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link'} data-city={name} onClick={onCitiesClick} href="/#">
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
