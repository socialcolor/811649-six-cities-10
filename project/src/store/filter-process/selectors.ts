import { NameSpace, SortName } from '../../const';
import { Offers } from '../../types/offer';
import { State } from '../../types/state';

export const getCurrentCity = () => (state: State) => state[NameSpace.Filter].city;
export const getCurrentCityName = () => (state: State) => state[NameSpace.Filter].city.name;
export const getCurrentSortName = () => (state: State) => state[NameSpace.Filter].currentSort;
export const changeActiveSort = (offers: Offers, sortName: string) => (state: State) => {
  let sortedOffers = offers;
  switch (sortName) {
    case SortName.Popular:
      break;
    case SortName.LowToHigh:
      sortedOffers = [...offers].sort((a, b) => a.price - b.price);
      break;
    case SortName.HighToLow:
      sortedOffers = [...offers].sort((a, b) => b.price - a.price);
      break;
    case SortName.Top:
      sortedOffers = [...offers].sort((a, b) => b.rating - a.rating);
      break;
  }
  return sortedOffers;
};

