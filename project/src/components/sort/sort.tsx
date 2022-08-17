import { useAppSelector } from '../../hooks';
import { getCurrentSortName } from '../../store/selectors';
import { SortTitles, SortName } from '../../const';
import { MouseEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/index';
import { changeActiveSort } from '../../store/action';

export default function Sort(): JSX.Element {
  const [sortIsVisible, setSortIsVisible] = useState<boolean>(false);
  const sortName = useAppSelector(getCurrentSortName());
  const dispatch = useAppDispatch();
  const sortListClickHandler = () => setSortIsVisible(!sortIsVisible);
  const sortHoverHandler = () => !sortIsVisible ? setSortIsVisible(!sortIsVisible) : null;
  const outOfSortHandler = () => sortIsVisible ? setSortIsVisible(!sortIsVisible) : null;
  const sortItemClickHandler = (evt: MouseEvent<HTMLElement>) => {
    const newSortName = evt.currentTarget.dataset.sort ? evt.currentTarget.dataset.sort : sortName;
    dispatch(changeActiveSort(newSortName));
  };

  return (
    <form className="places__sorting" action="/#" method="get" onMouseLeave={outOfSortHandler}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={sortListClickHandler} onMouseEnter={sortHoverHandler} >
        {SortTitles[sortName]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${sortIsVisible ? 'places__options--opened' : ''}`}>
        {Object.keys(SortName).map((item, index, array) => <li key={item} className={`places__option ${item === sortName ? 'places__option--active' : ''}`} tabIndex={0} data-sort={item} onClick={sortItemClickHandler}> {SortTitles[item]}</li>
        )}
      </ul>
    </form >
  );
}
