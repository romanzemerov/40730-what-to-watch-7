import { createSelector } from '@reduxjs/toolkit';

export const getMovies = createSelector(
  (state) => state.data.movies,
  (movies) => movies,
);

export const getMoviesStatus = createSelector(
  (state) => state.data.moviesStatus,
  (moviesStatus) => moviesStatus,
);
