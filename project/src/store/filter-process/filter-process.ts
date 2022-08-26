import { createSlice } from '@reduxjs/toolkit';
import { city, NameSpace, SortName } from '../../const';
import { FilterProcess } from '../../types/state';

const initialState: FilterProcess = {
  city: city.Amsterdam,
  currentSort: SortName.Popular,
};

export const filterProcess = createSlice({
  name: NameSpace.Filter,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = city[action.payload];
    },
    setCurrentSort: (state, action) => {
      state.currentSort = action.payload;
    }
  }
});

export const { changeCity, setCurrentSort } = filterProcess.actions;
