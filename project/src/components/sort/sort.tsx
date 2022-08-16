/* eslint-disable */
import { useAppSelector } from '../../hooks';
import { getCurrentSortName, getOffers } from '../../store/selectors';
import { ActiveSort } from '../../const';
import { MouseEvent, useState } from 'react';
import {store} from '../../store';
import { changeSort } from '../../store/action';
import { Offer } from '../../types/offer';

export default function Sort(): JSX.Element {
  const [showSort, setShowSort] = useState<boolean>(false);
  const sortName = useAppSelector(getCurrentSortName());
  const offers = useAppSelector(getOffers());

  const sortListClickHandler = () => setShowSort(!showSort);
  const sortHoverHandler = () => !showSort ? setShowSort(!showSort) : null;
  const outOfSortHandler = () => showSort ? setShowSort(!showSort) : null;
  const sortItemClickHandler = (event: MouseEvent<HTMLElement>) => {
    const newSortName = event.currentTarget.dataset.sort ? event.currentTarget.dataset.sort.toString() : sortName;
    const newSortingOffers = sortingOffers(newSortName);
    store.dispatch(changeSort({sort: newSortName, offers: newSortingOffers}))
  };
  const sortingOffers = (sortName: string) => {
    let sortedOffers:Offer[] = [];
    switch (sortName) {
      case ActiveSort.Popular:
        sortedOffers = offers;
        break
      case ActiveSort.LowToHigh:
        sortedOffers = offers.sort((a, b) => a.price - b.price)
        break
      case ActiveSort.HighToLow:
        sortedOffers = offers.sort((a, b) => b.price - a.price)
        break
      case ActiveSort.TOP:
        sortedOffers = offers.sort((a, b) => b.rating - a.rating)
        break
    }
    return sortedOffers;
  }

  return (
    <form className="places__sorting" action="/#" method="get" onMouseLeave={outOfSortHandler}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={sortListClickHandler} onMouseEnter={sortHoverHandler} >
        {sortName}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${showSort ? 'places__options--opened' : ''}`}>
        {Object.values(ActiveSort).map((item) => (
          <li key={item} className={`places__option ${item === sortName ? 'places__option--active' : ''}`} tabIndex={0} data-sort={item} onClick={sortItemClickHandler}>{item}</li>
        ))}
      </ul>
    </form>
  );
}
