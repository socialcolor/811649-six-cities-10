import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FavoriteProcess } from '../../types/state';
import { fetchLoadFavoriteAction } from '../api-actions';

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
      });
  }
});
