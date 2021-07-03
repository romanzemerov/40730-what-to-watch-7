import browserHistory from '../../browser-history';
import { createAction } from '@reduxjs/toolkit';

export const redirectToRoute = createAction('movies/redirectToRoute', (route) => ({
  payload: route,
}));

export const redirect = (_store) => (next) => (action) => {
  if (action.type === redirectToRoute.toString()) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
