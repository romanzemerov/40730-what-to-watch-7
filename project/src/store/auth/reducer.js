import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, loadingStates } from '../../const';
import { changeAuthStatus, loginError, loginRequest, loginSuccess, updateUser } from './actions';
  logoutError,
  logoutRequest,
  logoutSuccess,

const initialState = {
  user: {},
  loginStatus: loadingStates.IDLE,
  loginError: '',
  authStatus: AuthorizationStatus.UNKNOWN,
  logoutStatus: loadingStates.IDLE,
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
    })
    .addCase(updateUser, (state, { payload }) => {
      state.user = payload;
    });
});
