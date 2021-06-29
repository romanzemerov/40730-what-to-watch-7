import { ActionType } from './actions';
import { AuthorizationStatus, loadingStates } from '../const';

const initialState = {
  movies: [],
  moviesStatus: loadingStates.IDLE,
  genre: '',
  filteredMovies: [],
  user: {},
  loginStatus: loadingStates.IDLE,
  loginError: '',
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRES_FILTER:
      return {
        ...state,
        genre: action.payload,
        filteredMovies: state.movies.filter(({ genre }) => genre === action.payload),
      };
    case ActionType.CLEAR_GENRES_FILTER:
      return {
        ...state,
        genre: initialState.genre,
        filteredMovies: state.movies,
      };
    case ActionType.GET_MOVIES_REQUEST:
      return {
        ...state,
        movies: initialState.movies,
        moviesStatus: loadingStates.LOADING,
      };
    case ActionType.GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        moviesStatus: loadingStates.SUCCEEDED,
        filteredMovies: action.payload,
      };
    case ActionType.GET_MOVIES_ERROR:
      return {
        ...state,
        moviesStatus: loadingStates.FAILED,
      };
    case ActionType.LOGIN_REQUEST: {
      return { ...state, loginStatus: loadingStates.LOADING };
    }
    case ActionType.LOGIN_SUCCESS: {
      return {
        ...state,
        loginStatus: loadingStates.SUCCEEDED,
        user: action.payload,
        loginError: initialState.loginError,
      };
    }
    case ActionType.LOGIN_ERROR: {
      return { ...state, loginStatus: loadingStates.FAILED, loginError: action.payload };
    }
    case ActionType.CHANGE_AUTH_STATUS: {
      return { ...state, authorizationStatus: action.payload };
    }
    case ActionType.UPDATE_USER: {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
};
