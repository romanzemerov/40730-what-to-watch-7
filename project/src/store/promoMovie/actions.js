import { createAction } from '@reduxjs/toolkit';

export const fetchMovieRequest = createAction('promoMovie/fetchMovie');
export const fetchMovieSuccess = createAction('promoMovie/fetchMovieSuccess', (movie) => ({
  payload: movie,
}));
export const fetchMovieError = createAction('promoMovie/fetchMovieError');

export const changeFavoriteStatusRequest = createAction('promoMovie/changeFavoriteStatusRequest');
export const changeFavoriteStatusSuccess = createAction(
  'promoMovie/changeFavoriteStatusSuccess',
  (status) => ({
    payload: status,
  }),
);
export const changeFavoriteStatusError = createAction('promoMovie/changeFavoriteStatusError');
