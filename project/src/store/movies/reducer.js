import { createReducer } from '@reduxjs/toolkit';
import { LoadingStatus } from '../../const';
import {
  changeFavoriteStatusError,
  changeFavoriteStatusRequest,
  changeFavoriteStatusSuccess,
  fetchFavoriteMoviesError,
  fetchFavoriteMoviesRequest,
  fetchFavoriteMoviesSuccess,
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
  currentMovieStatus: LoadingStatus.IDLE,
  changeFavoriteStatus: LoadingStatus.IDLE,
  movies: [],
  moviesStatus: LoadingStatus.IDLE,
  similarMovies: [],
  similarMoviesStatus: LoadingStatus.IDLE,
  favoriteMovies: [],
  favoriteMoviesStatus: LoadingStatus.IDLE,
};

export const moviesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getMoviesRequest, (state) => {
      state.moviesStatus = LoadingStatus.LOADING;
      state.movies = initialState.movies;
    })
    .addCase(getMoviesSuccess, (state, { payload }) => {
      state.moviesStatus = LoadingStatus.SUCCEEDED;
      state.movies = payload;
    })
    .addCase(getMoviesError, (state) => {
      state.moviesStatus = LoadingStatus.FAILED;
    })

    .addCase(getMovieRequest, (state) => {
      state.currentMovieStatus = LoadingStatus.LOADING;
      state.currentMovie = initialState.currentMovie;
    })
    .addCase(getMovieSuccess, (state, { payload }) => {
      state.currentMovieStatus = LoadingStatus.SUCCEEDED;
      state.currentMovie = payload;
    })
    .addCase(getMovieError, (state) => {
      state.currentMovieStatus = LoadingStatus.FAILED;
    })

    .addCase(getSimilarMoviesRequest, (state) => {
      state.similarMoviesStatus = LoadingStatus.LOADING;
      state.similarMovies = initialState.similarMovies;
    })
    .addCase(getSimilarMoviesSuccess, (state, { payload }) => {
      state.similarMoviesStatus = LoadingStatus.SUCCEEDED;
      state.similarMovies = payload;
    })
    .addCase(getSimilarMoviesError, (state) => {
      state.similarMoviesStatus = LoadingStatus.FAILED;
    })

    .addCase(fetchFavoriteMoviesRequest, (state) => {
      state.favoriteMoviesStatus = LoadingStatus.LOADING;
      state.favoriteMovies = initialState.favoriteMovies;
    })
    .addCase(fetchFavoriteMoviesSuccess, (state, { payload }) => {
      state.favoriteMoviesStatus = LoadingStatus.SUCCEEDED;
      state.favoriteMovies = payload;
    })
    .addCase(fetchFavoriteMoviesError, (state) => {
      state.favoriteMoviesStatus = LoadingStatus.FAILED;
    })

    .addCase(changeFavoriteStatusRequest, (state) => {
      state.changeFavoriteStatus = LoadingStatus.LOADING;
    })
    .addCase(changeFavoriteStatusSuccess, (state, { payload }) => {
      state.changeFavoriteStatus = LoadingStatus.SUCCEEDED;
      state.currentMovie.isFavorite = payload;
    })
    .addCase(changeFavoriteStatusError, (state) => {
      state.changeFavoriteStatus = LoadingStatus.FAILED;
    });
});
