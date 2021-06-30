import { createReducer } from '@reduxjs/toolkit';
import { loadingStates } from '../../const';
import { getMoviesError, getMoviesRequest, getMoviesSuccess } from './actions';

const initialState = {
  movies: [],
  moviesStatus: loadingStates.IDLE,
};

export const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getMoviesRequest, (state) => {
      state.moviesStatus = loadingStates.LOADING;
      state.movies = initialState.movies;
    })
    .addCase(getMoviesSuccess, (state, { payload }) => {
      state.movies = payload;
      state.moviesStatus = loadingStates.SUCCEEDED;
    })
    .addCase(getMoviesError, (state) => {
      state.moviesStatus = loadingStates.FAILED;
    });
});
