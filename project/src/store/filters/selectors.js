import { createSelector } from '@reduxjs/toolkit';

export const getFilteredMovies = createSelector(
  (state) => state.data.movies,
  (state) => state.filters.genre,
  (movies, genre) => (genre ? movies.filter((movie) => movie.genre === genre) : movies),
);

export const getGenre = createSelector(
  (state) => state.filters.genre,
  (genre) => genre,
);
