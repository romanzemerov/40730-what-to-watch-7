import { createReducer } from '@reduxjs/toolkit';
import { AuthStates, loadingStates } from '../../const';
import {
  resetUserData,
  checkAuthStateError,
  checkAuthStateRequest,
  checkAuthStateSuccess,
  loginError,
  loginRequest,
  loginSuccess,
  logoutError,
  logoutRequest,
  logoutSuccess,
} from './actions';

const initialState = {
  user: {},
  loginStatus: loadingStates.IDLE,
  loginError: '',
  logoutStatus: loadingStates.IDLE,
  authState: AuthStates.UNKNOWN,
  authStatus: loadingStates.IDLE,
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
      state.authState = AuthStates.AUTH;
    })
    .addCase(loginError, (state, { payload }) => {
      state.user = initialState.user;
      state.loginStatus = loadingStates.FAILED;
      state.loginError = payload;
      state.authState = AuthStates.NO_AUTH;
    })

    .addCase(logoutRequest, (state) => {
      state.logoutStatus = loadingStates.LOADING;
    })
    .addCase(logoutSuccess, (state) => {
      state.logoutStatus = loadingStates.SUCCEEDED;
      state.user = initialState.user;
      state.authState = AuthStates.NO_AUTH;
    })
    .addCase(logoutError, (state, { payload }) => {
      state.logoutStatus = loadingStates.FAILED;
    })

    .addCase(checkAuthStateRequest, (state) => {
      state.authStatus = loadingStates.LOADING;
    })
    .addCase(checkAuthStateSuccess, (state, { payload }) => {
      state.authStatus = loadingStates.SUCCEEDED;
      state.user = payload;
      state.authState = AuthStates.AUTH;
    })
    .addCase(checkAuthStateError, (state) => {
      state.authStatus = loadingStates.FAILED;
      state.authState = AuthStates.NO_AUTH;
    })

    .addCase(resetUserData, (state) => {
      state.authState = AuthStates.NO_AUTH;
      state.user = initialState.user;
    });
});
