import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStates, loadingStates } from '../../const';
import {
  changeAuthState,
  checkAuthStateError,
  checkAuthStateRequest,
  checkAuthStateSuccess,
  loginError,
  loginRequest,
  loginSuccess,
  logoutError,
  logoutRequest,
  logoutSuccess
} from './actions';

const initialState = {
  user: {},
  loginStatus: loadingStates.IDLE,
  loginError: '',
  logoutStatus: loadingStates.IDLE,
  authState: AuthorizationStates.UNKNOWN,
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
    })
    .addCase(loginError, (state, { payload }) => {
      state.user = initialState.user;
      state.loginStatus = loadingStates.FAILED;
      state.loginError = payload;
    })

    .addCase(logoutRequest, (state) => {
      state.logoutStatus = loadingStates.LOADING;
    })
    .addCase(logoutSuccess, (state, { payload }) => {
      state.logoutStatus = loadingStates.SUCCEEDED;
      state.user = initialState.user;
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
    })
    .addCase(checkAuthStateError, (state) => {
      state.authStatus = loadingStates.FAILED;
    })

    .addCase(changeAuthState, (state, { payload }) => {
      state.authState = payload;
    });
});
