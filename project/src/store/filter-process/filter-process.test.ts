import { City, SortName } from '../../const';
import { changeCity, filterProcess, setCurrentSort } from './filter-process';

describe('Reducer Filter Process', () => {
  it('Should update state city', () => {
    const state = {
      city: City.Paris,
      currentSort: SortName.Popular
    };
    expect(filterProcess.reducer(state, { type: changeCity.type, payload: City.Cologne.name }))
      .toEqual({city: City.Cologne, currentSort: SortName.Popular});
  });

  it('Should update state currentSort', () => {
    const state = {
      city: City.Paris,
      currentSort: SortName.Popular
    };
    expect(filterProcess.reducer(state, { type: setCurrentSort.type, payload: SortName.HighToLow }))
      .toEqual({city: City.Paris, currentSort: SortName.HighToLow});
  });
});
