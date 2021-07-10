import { createReducer } from '@reduxjs/toolkit';
import { loadingStates } from '../../const';
import {
  getMovieError,
  getMovieRequest,
  getMoviesError,
  getMoviesRequest,
  getMoviesSuccess,
  getMovieSuccess,
  getSimilarMoviesError,
  getSimilarMoviesRequest,
  getSimilarMoviesSuccess
} from './actions';

const initialState = {
  currentMovie: {},
  currentMovieStatus: loadingStates.IDLE,
  movies: [],
  moviesStatus: loadingStates.IDLE,
  similarMovies: [],
  similarMoviesStatus: loadingStates.IDLE,
};

export const moviesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getMoviesRequest, (state) => {
      state.moviesStatus = loadingStates.LOADING;
      state.movies = initialState.movies;
    })
    .addCase(getMoviesSuccess, (state, { payload }) => {
      state.moviesStatus = loadingStates.SUCCEEDED;
      state.movies = payload;
    })
    .addCase(getMoviesError, (state) => {
      state.moviesStatus = loadingStates.FAILED;
    })

    .addCase(getMovieRequest, (state) => {
      state.currentMovieStatus = loadingStates.LOADING;
      state.currentMovie = initialState.currentMovie;
    })
    .addCase(getMovieSuccess, (state, { payload }) => {
      state.currentMovieStatus = loadingStates.SUCCEEDED;
      state.currentMovie = payload;
    })
    .addCase(getMovieError, (state) => {
      state.currentMovieStatus = loadingStates.FAILED;
    })

    .addCase(getSimilarMoviesRequest, (state) => {
      state.similarMoviesStatus = loadingStates.LOADING;
      state.similarMovies = initialState.similarMovies;
    })
    .addCase(getSimilarMoviesSuccess, (state, { payload }) => {
      state.similarMoviesStatus = loadingStates.SUCCEEDED;
      state.similarMovies = payload;
    })
    .addCase(getSimilarMoviesError, (state) => {
      state.similarMoviesStatus = loadingStates.FAILED;
    .addCase(changeFavoriteStatusRequest, (state) => {
      state.changeFavoriteStatus = loadingStates.LOADING;
    })
    .addCase(changeFavoriteStatusSuccess, (state, { payload }) => {
      state.changeFavoriteStatus = loadingStates.SUCCEEDED;
      state.currentMovie.isFavorite = payload;
    })
    .addCase(changeFavoriteStatusError, (state) => {
      state.changeFavoriteStatus = loadingStates.FAILED;
    });
});
