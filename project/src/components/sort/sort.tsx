/* eslint-disable */
import { useAppSelector } from '../../hooks';
import { getCurrentSortName } from '../../store/selectors';
import { ActiveSort } from '../../const';
import { MouseEvent, useState } from 'react';

export default function Sort(): JSX.Element {
  const [showSort, setShowSort] = useState<boolean>(false);
  const sortName = useAppSelector(getCurrentSortName());

  const sortClickHandler = () => setShowSort(!showSort);
  const sortHoverHandler = () => !showSort ? setShowSort(!showSort) : null;
  const onOutOfSortHandler = (event: MouseEvent) => showSort ? setShowSort(!showSort) : null;

  return (
    <form className="places__sorting" action="/#" method="get" onMouseLeave={onOutOfSortHandler}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={sortClickHandler} onMouseEnter={sortHoverHandler} >
        {sortName}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${showSort && 'places__options--opened'}`}>
        <li className={`places__option ${sortName === ActiveSort.Popular ? 'places__option--active' : null}`} tabIndex={0}>Popular</li>
        <li className={`places__option ${sortName === ActiveSort.LowToHigh ? 'places__option--active' : null}`} tabIndex={0}>Price: low to high</li>
        <li className={`places__option ${sortName === ActiveSort.HighToLow ? 'places__option--active' : null}`} tabIndex={0}>Price: high to low</li>
        <li className={`places__option ${sortName === ActiveSort.TOP ? 'places__option--active' : null}`} tabIndex={0}>Top rated first</li>
      </ul>
    </form>
  );
}
