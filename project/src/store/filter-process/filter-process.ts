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
    // changeActiveSort: (state, acttion) => {
    //   switch (state.currentSort) {
    //     case SortName.Popular:
    //       state.offers = state.allOffers;
    //       break;
    //     case SortName.LowToHigh:
    //       state.offers = [...state.allOffers].sort((a, b) => a.price - b.price);
    //       break;
    //     case SortName.HighToLow:
    //       state.offers = [...state.allOffers].sort((a, b) => b.price - a.price);
    //       break;
    //     case SortName.Top:
    //       state.offers = [...state.allOffers].sort((a, b) => b.rating - a.rating);
    //       break;
    //   }
    // },
  }
});

export const { changeCity, setCurrentSort } = filterProcess.actions;
