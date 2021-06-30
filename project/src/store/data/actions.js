import { createAction } from '@reduxjs/toolkit';

export const getMoviesRequest = createAction('data/fetchMoviesRequest');
export const getMoviesSuccess = createAction('data/fetchMoviesSuccess', (movies) => ({ payload: movies }));
export const getMoviesError = createAction('data/fetchMoviesError');
