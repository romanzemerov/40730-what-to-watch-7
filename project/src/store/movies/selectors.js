import { createSelector } from '@reduxjs/toolkit';

export const getCurrentMovie = createSelector(
  (state) => state.movies.currentMovie,
  (currentMovie) => currentMovie,
);

export const getCurrentMovieStatus = createSelector(
  (state) => state.movies.currentMovieStatus,
  (currentMovieStatus) => currentMovieStatus,
);

export const getMovies = createSelector(
  (state) => state.movies.movies,
  (movies) => movies,
);

export const getMoviesStatus = createSelector(
  (state) => state.movies.moviesStatus,
  (moviesStatus) => moviesStatus,
);

export const getSimilarMovies = createSelector(
  (state) => state.movies.similarMovies,
  (state) => state.movies.currentMovie,
  (similarMovies, currentMovie) => similarMovies.filter((movie) => movie.id !== currentMovie.id),
);

export const getSimilarMoviesStatus = createSelector(
  (state) => state.movies.similarMoviesStatus,
  (similarMoviesStatus) => similarMoviesStatus,
);

export const getFavoriteMovies = createSelector(
  (state) => state.movies.favoriteMovies,
  (favoriteMovies) => favoriteMovies,
);

export const getFavoriteMoviesStatus = createSelector(
  (state) => state.movies.favoriteMoviesStatus,
  (favoriteMoviesStatus) => favoriteMoviesStatus,
);

export const getChangeFavoriteStatus = createSelector(
  (state) => state.movies.changeFavoriteStatus,
  (changeFavoriteStatus) => changeFavoriteStatus,
);
