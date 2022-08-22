import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import createAPI from '../services/api';
import {redirect} from './middlewares/redirect';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    }
  }).concat(redirect)
});
