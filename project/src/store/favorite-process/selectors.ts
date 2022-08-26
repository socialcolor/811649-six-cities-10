import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getFavoriteOffers = () => (state: State) => state[NameSpace.Favorite].favorite;
