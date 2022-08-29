import { AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';
import {UserData} from '../../types/user-data';

describe('Reducer user proccess', () => {
  it('should update AuthorizationStatus when rejected', () => {
    const state = {
      user: null,
      authorizationStatus: AuthorizationStatus.Unknown,
      formLoginError: null
    };
    expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
      .toEqual({
        user: null,
        authorizationStatus: AuthorizationStatus.NoAuth,
        formLoginError: null
      });
  });

  it('should update user and AuthorizationStatus when fulfilled', () => {
    const state = {
      user: null,
      authorizationStatus: AuthorizationStatus.Unknown,
      formLoginError: null
    };
    expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type, payload: {} }))
      .toEqual({
        user: {},
        authorizationStatus: AuthorizationStatus.Auth,
        formLoginError: null
      });
  });

  it('should update state form error when loginAction pending', () => {
    const state = {
      user: null,
      authorizationStatus: AuthorizationStatus.NoAuth,
      formLoginError: null
    };
    expect(userProcess.reducer(state, { type: loginAction.pending.type }))
      .toEqual({
        user: null,
        authorizationStatus: AuthorizationStatus.NoAuth,
        formLoginError: null
      });
  });

  it('should update state form error when loginAction rejected', () => {
    const state = {
      user: null,
      authorizationStatus: AuthorizationStatus.NoAuth,
      formLoginError: null
    };
    expect(userProcess.reducer(state, { type: loginAction.rejected.type, error: {message: 'error'}}))
      .toEqual({
        user: null,
        authorizationStatus: AuthorizationStatus.NoAuth,
        formLoginError: 'error',
      });
  });

  it('should update state user when loginAction fulfilled', () => {
    const state = {
      user: null,
      authorizationStatus: AuthorizationStatus.NoAuth,
      formLoginError: null
    };
    expect(userProcess.reducer(state, { type: loginAction.fulfilled.type, payload: {}}))
      .toEqual({
        user: {},
        authorizationStatus: AuthorizationStatus.Auth,
        formLoginError: null,
      });
  });

  it('should update state user when logoutAction fulfilled', () => {
    const state = {
      user: {} as UserData,
      authorizationStatus: AuthorizationStatus.Auth,
      formLoginError: null
    };
    expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type, payload: {}}))
      .toEqual({
        user: null,
        authorizationStatus: AuthorizationStatus.NoAuth,
        formLoginError: null,
      });
  });

});
