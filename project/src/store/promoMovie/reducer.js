import { createReducer } from '@reduxjs/toolkit';
import { loadingStates } from '../../const';
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
  promoMovieStatus: loadingStates.IDLE,
  changeFavoriteStatus: loadingStates.IDLE,
};

export const promoMovieReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchMovieRequest, (state) => {
      state.promoMovieStatus = loadingStates.LOADING;
    })
    .addCase(fetchMovieSuccess, (state, { payload }) => {
      state.promoMovieStatus = loadingStates.SUCCEEDED;
      state.promoMovie = payload;
    })
    .addCase(fetchMovieError, (state) => {
      state.promoMovieStatus = loadingStates.FAILED;
    })

    .addCase(changeFavoriteStatusRequest, (state) => {
      state.changeFavoriteStatus = loadingStates.LOADING;
    })
    .addCase(changeFavoriteStatusSuccess, (state, { payload }) => {
      state.changeFavoriteStatus = loadingStates.SUCCEEDED;
      state.promoMovie.isFavorite = payload;
    })
    .addCase(changeFavoriteStatusError, (state) => {
      state.changeFavoriteStatus = loadingStates.FAILED;
    });
});
