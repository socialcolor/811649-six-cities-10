import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FavoriteProcess } from '../../types/state';
import { fetchChangeFavorite, fetchLoadFavoriteAction } from '../api-actions';

const initialState: FavoriteProcess = {
  favorite: [],
};

export const favoriteProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLoadFavoriteAction.fulfilled, (state, action) => {
        state.favorite = action.payload;
      })
      .addCase(fetchChangeFavorite.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.favorite = [...state.favorite].concat(action.payload);
        }
        if (!action.payload.isFavorite) {
          state.favorite = [...state.favorite].filter((offer) => offer.id !== action.payload.id);
        }
      });
  }
});
