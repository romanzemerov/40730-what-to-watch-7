import { createReducer } from '@reduxjs/toolkit';
import { AuthStates, LoadingStatus } from '../../const';
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
  loginStatus: LoadingStatus.IDLE,
  loginError: '',
  logoutStatus: LoadingStatus.IDLE,
  authState: AuthStates.UNKNOWN,
  authStatus: LoadingStatus.IDLE,
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginRequest, (state) => {
      state.loginStatus = LoadingStatus.LOADING;
    })
    .addCase(loginSuccess, (state, { payload }) => {
      state.loginStatus = LoadingStatus.SUCCEEDED;
      state.user = payload;
      state.loginError = initialState.loginError;
      state.authState = AuthStates.AUTH;
    })
    .addCase(loginError, (state, { payload }) => {
      state.user = initialState.user;
      state.loginStatus = LoadingStatus.FAILED;
      state.loginError = payload;
      state.authState = AuthStates.NO_AUTH;
    })

    .addCase(logoutRequest, (state) => {
      state.logoutStatus = LoadingStatus.LOADING;
    })
    .addCase(logoutSuccess, (state) => {
      state.logoutStatus = LoadingStatus.SUCCEEDED;
      state.user = initialState.user;
      state.authState = AuthStates.NO_AUTH;
    })
    .addCase(logoutError, (state, { payload }) => {
      state.logoutStatus = LoadingStatus.FAILED;
    })

    .addCase(checkAuthStateRequest, (state) => {
      state.authStatus = LoadingStatus.LOADING;
    })
    .addCase(checkAuthStateSuccess, (state, { payload }) => {
      state.authStatus = LoadingStatus.SUCCEEDED;
      state.user = payload;
      state.authState = AuthStates.AUTH;
    })
    .addCase(checkAuthStateError, (state) => {
      state.authStatus = LoadingStatus.FAILED;
      state.authState = AuthStates.NO_AUTH;
    })

    .addCase(resetUserData, (state) => {
      state.authState = AuthStates.NO_AUTH;
      state.user = initialState.user;
    });
});
