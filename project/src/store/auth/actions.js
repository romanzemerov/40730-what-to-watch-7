import { createAction } from '@reduxjs/toolkit';

export const loginRequest = createAction('auth/loginRequest');
export const loginSuccess = createAction('auth/loginSuccess', (user) => ({ payload: user }));
export const loginError = createAction('auth/loginError', (error) => ({ payload: error }));

export const logoutRequest = createAction('auth/logoutRequest');
export const logoutSuccess = createAction('auth/logoutSuccess');
export const logoutError = createAction('auth/logoutError', (error) => ({ payload: error }));

export const checkAuthStateRequest = createAction('auth/checkAuthStateRequest');
export const checkAuthStateSuccess = createAction('auth/checkAuthStateSuccess', (state) => ({
  payload: state,
}));

export const changeAuthState = createAction('auth/changeAuthState', (state) => ({
  payload: state,
}));

export const updateUser = createAction('auth/updateUser', (user) => ({ payload: user }));
