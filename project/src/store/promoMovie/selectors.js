import { createSelector } from '@reduxjs/toolkit';

export const getPromoMovie = createSelector(
  (state) => state.promoMovie.promoMovie,
  (promoMovie) => promoMovie,
);

export const getPromoMovieStatus = createSelector(
  (state) => state.promoMovie.promoMovieStatus,
  (promoMovieStatus) => promoMovieStatus,
);

export const getChangeFavoriteStatus = createSelector(
  (state) => state.promoMovie.changeFavoriteStatus,
  (changeFavoriteStatus) => changeFavoriteStatus,
);
