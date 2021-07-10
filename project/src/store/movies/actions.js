import { createAction } from '@reduxjs/toolkit';

export const getMoviesRequest = createAction('movies/fetchMoviesRequest');
export const getMoviesSuccess = createAction('movies/fetchMoviesSuccess', (movies) => ({
  payload: movies,
}));
export const getMoviesError = createAction('movies/fetchMoviesError');

export const getMovieRequest = createAction('movies/fetchMovieRequest');
export const getMovieSuccess = createAction('movies/fetchMovieSuccess', (movie) => ({
  payload: movie,
}));
export const getMovieError = createAction('movies/fetchMovieError');

export const getSimilarMoviesRequest = createAction('movies/fetchSimilarMoviesRequest');
export const getSimilarMoviesSuccess = createAction(
  'movies/fetchSimilarMoviesSuccess',
  (movies) => ({
    payload: movies,
  }),
);
export const getSimilarMoviesError = createAction('movies/fetchSimilarMoviesError');

export const fetchFavoriteMoviesRequest = createAction('movies/fetchFavoriteMoviesRequest');
export const fetchFavoriteMoviesSuccess = createAction(
  'movies/fetchFavoriteMoviesSuccess',
  (movies) => ({ payload: movies }),
);
export const fetchFavoriteMoviesError = createAction('movies/fetchFavoriteMoviesError');

export const changeFavoriteStatusRequest = createAction('movies/changeFavoriteStatusRequest');
export const changeFavoriteStatusSuccess = createAction(
  'movies/changeFavoriteStatusSuccess',
  (status) => ({
    payload: status,
  }),
);
export const changeFavoriteStatusError = createAction('movies/changeFavoriteStatusError');
