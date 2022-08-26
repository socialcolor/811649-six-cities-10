import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getAuthStatus = () => (state: State) => state[NameSpace.User].authorizationStatus;
export const getUserData = () => (state: State) => state[NameSpace.User].user;
export const getFormUserError = () => (state: State) => state[NameSpace.User].formLoginError;
