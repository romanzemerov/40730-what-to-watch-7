import { loadingStates } from '../const';

export const ActionType = {
  CHANGE_GENRES_FILTER: 'filter/changeGenresFilter',
  CLEAR_GENRES_FILTER: 'filter/clearGenresFilter',
  GET_MOVIES_REQUEST: 'data/fetchMoviesRequest',
  GET_MOVIES_SUCCESS: 'data/fetchMoviesSuccess',
  GET_MOVIES_ERROR: 'data/fetchMoviesError',
  LOGIN_REQUEST: 'auth/loginRequest',
  LOGIN_SUCCESS: 'auth/loginSuccess',
  LOGIN_ERROR: 'auth/loginError',
  CHANGE_AUTH_STATUS: 'auth/changeAuthStatus',
  UPDATE_USER: 'auth/updateUser',
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
    payload: loadingStates.LOADING,
  }),
  getMoviesSuccess: (movies) => ({
    type: ActionType.GET_MOVIES_SUCCESS,
    payload: movies,
  }),
  getMoviesError: () => ({
    type: ActionType.GET_MOVIES_ERROR,
  }),
  loginRequest: () => ({
    type: ActionType.LOGIN_REQUEST,
  }),
  loginSuccess: (user) => ({
    type: ActionType.LOGIN_SUCCESS,
    payload: user,
  }),
  loginError: (error) => ({
    type: ActionType.LOGIN_ERROR,
    payload: error,
  }),
  changeAuthStatus: (status) => ({
    type: ActionType.CHANGE_AUTH_STATUS,
    payload: status,
  }),
  updateUser: (user) => ({
    type: ActionType.UPDATE_USER,
    payload: user,
  }),
};
