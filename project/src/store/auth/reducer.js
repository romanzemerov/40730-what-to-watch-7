import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, loadingStates } from '../../const';
import { changeAuthStatus, loginError, loginRequest, loginSuccess, updateUser } from './actions';

const initialState = {
  user: {},
  loginStatus: loadingStates.IDLE,
  loginError: '',
  authStatus: AuthorizationStatus.UNKNOWN,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginRequest, (state) => {
      state.loginStatus = loadingStates.LOADING;
    })
    .addCase(loginSuccess, (state, { payload }) => {
      state.loginStatus = loadingStates.SUCCEEDED;
      state.user = payload;
      state.loginError = initialState.loginError;
    })
    .addCase(loginError, (state, { payload }) => {
      state.user = initialState.user;
      state.loginStatus = loadingStates.FAILED;
      state.loginError = payload;
    })
    .addCase(changeAuthStatus, (state, { payload }) => {
      state.authStatus = payload;
    })
    .addCase(updateUser, (state, { payload }) => {
      state.user = payload;
    });
});
