import { createReducer } from '@reduxjs/toolkit';
import { changeGenresFilter, clearGenresFilter } from './actions';

const initialState = {
  genre: '',
};

export const filtersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenresFilter, (state, { payload }) => {
      state.genre = payload;
    })
    .addCase(clearGenresFilter, (state) => {
      state.genre = initialState.genre;
    });
});
