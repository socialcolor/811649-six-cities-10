import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentSortName } from '../../store/filter-process/selectors';
import { setCurrentSort } from '../../store/filter-process/filter-process';
import { SortTitles, SortName } from '../../const';
import { memo, MouseEvent, useState } from 'react';

function Sort(): JSX.Element {
  const [sortIsVisible, setSortIsVisible] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const sortName = useAppSelector(getCurrentSortName());

  const onSortListClick = () => setSortIsVisible(!sortIsVisible);
  const onSortHover = () => {
    if (!sortIsVisible) {
      setSortIsVisible(!sortIsVisible);
    }
  };
  const outOfSort = () => {
    if (sortIsVisible) {
      setSortIsVisible(!sortIsVisible);
    }
  };

  const onSortItemClick = (evt: MouseEvent<HTMLElement>) => {
    const newSortName = evt.currentTarget.dataset.sort ? evt.currentTarget.dataset.sort : sortName;
    dispatch(setCurrentSort(newSortName));
  };

  return (
    <form className="places__sorting" action="/#" method="get" onMouseLeave={outOfSort}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={onSortListClick} onMouseEnter={onSortHover} >
        {SortTitles[sortName]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${sortIsVisible ? 'places__options--opened' : ''}`}>
        {Object.keys(SortName).map((item) => <li key={item} className={`places__option ${item === sortName ? 'places__option--active' : ''}`} tabIndex={0} data-sort={item} onClick={onSortItemClick}> {SortTitles[item]}</li>
        )}
      </ul>
    </form >
  );
}

export default memo(Sort);
