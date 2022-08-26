import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { filterProcess } from './filter-process/filter-process';
import { offersData } from './offers-data/offers-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Filter]: filterProcess.reducer,
});
