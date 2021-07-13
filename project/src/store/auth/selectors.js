import { createSelector } from '@reduxjs/toolkit';

export const getLoginStatus = createSelector(
  (state) => state.auth.loginStatus,
  (loginStatus) => loginStatus,
);

export const getLoginError = createSelector(
  (state) => state.auth.loginError,
  (loginError) => loginError,
);

export const getAuthState = createSelector(
  (state) => state.auth.authState,
  (authState) => authState,
);

export const getAuthStatus = createSelector(
  (state) => state.auth.authStatus,
  (authStatus) => authStatus,
);

export const getUser = createSelector(
  (state) => state.auth.user,
  (user) => user,
);
