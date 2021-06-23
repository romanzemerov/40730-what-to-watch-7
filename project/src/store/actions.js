import { LOADING_STATES } from '../const';

export const ActionType = {
  CHANGE_GENRES_FILTER: 'filter/changeGenresFilter',
  CLEAR_GENRES_FILTER: 'filter/clearGenresFilter',
  GET_MOVIES_REQUEST: 'data/fetchMoviesRequest',
  GET_MOVIES_SUCCESS: 'data/fetchMoviesSuccess',
  GET_MOVIES_ERROR: 'data/fetchMoviesError',
};

export const ActionCreator = {
  changeGenresFilter: (genre) => ({
    type: ActionType.CHANGE_GENRES_FILTER,
    payload: genre,
  }),
  clearGenresFilter: () => ({
    type: ActionType.CLEAR_GENRES_FILTER,
  }),
  getMoviesRequest: () => ({
    type: ActionType.GET_MOVIES_REQUEST,
    payload: LOADING_STATES.LOADING,
  }),
  getMoviesSuccess: (movies) => ({
    type: ActionType.GET_MOVIES_SUCCESS,
    payload: movies,
  }),
  getMoviesError: () => ({
    type: ActionType.GET_MOVIES_ERROR,
  }),
};
