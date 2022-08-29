import { Offer } from '../../types/offer';
import { fetchChangeFavorite, fetchLoadFavoriteAction } from '../api-actions';
import { favoriteProcess } from './favorite-process';

describe('Reducer Favorite-Process', () => {
  it('should update state Favorite', () => {
    const state = { favorite: [] };
    expect(favoriteProcess.reducer(state, { type: fetchLoadFavoriteAction.fulfilled.type, payload: [] as Offer[] }))
      .toEqual({ favorite: [] as Offer[] });
  });

  it('should change favorite status with true on false', () => {
    const state = { favorite: []};
    expect(favoriteProcess.reducer(state, { type: fetchChangeFavorite.fulfilled.type, payload: {isFavorite: true} as Offer }))
      .toEqual({favorite: [{isFavorite: true}] as Offer[]});
  });

});
