import { createSlice } from '@reduxjs/toolkit';
import { City, NameSpace, SortName } from '../../const';
import { FilterProcess } from '../../types/state';

const initialState: FilterProcess = {
  city: City.Paris,
  currentSort: SortName.Popular,
};

export const filterProcess = createSlice({
  name: NameSpace.Filter,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = City[action.payload];
    },
    setCurrentSort: (state, action) => {
      state.currentSort = action.payload;
    }
  }
});

export const { changeCity, setCurrentSort } = filterProcess.actions;
