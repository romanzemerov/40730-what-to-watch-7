import { createReducer } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../const';
import {
  changeFavoriteStatusError,
  changeFavoriteStatusRequest,
  changeFavoriteStatusSuccess,
  fetchMovieError,
  fetchMovieRequest,
  fetchMovieSuccess
} from './actions';

const initialState = {
  promoMovie: {},
  promoMovieStatus: LoadingStatus.IDLE,
  changeFavoriteStatus: LoadingStatus.IDLE,
};

export const promoMovieReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMovieRequest, (state) => {
      state.promoMovieStatus = LoadingStatus.LOADING;
    })
    .addCase(fetchMovieSuccess, (state, { payload }) => {
      state.promoMovieStatus = LoadingStatus.SUCCEEDED;
      state.promoMovie = payload;
    })
    .addCase(fetchMovieError, (state) => {
      state.promoMovieStatus = LoadingStatus.FAILED;
    })

    .addCase(changeFavoriteStatusRequest, (state) => {
      state.changeFavoriteStatus = LoadingStatus.LOADING;
    })
    .addCase(changeFavoriteStatusSuccess, (state, { payload }) => {
      state.changeFavoriteStatus = LoadingStatus.SUCCEEDED;
      state.promoMovie.isFavorite = payload;
    })
    .addCase(changeFavoriteStatusError, (state) => {
      state.changeFavoriteStatus = LoadingStatus.FAILED;
    });
});
