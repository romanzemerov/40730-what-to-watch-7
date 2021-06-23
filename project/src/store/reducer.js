import { ActionType } from './actions';
import { LOADING_STATES } from '../const';

const initialState = {
  movies: [],
  moviesStatus: LOADING_STATES.IDLE,
  genre: '',
  filteredMovies: [],
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
        moviesStatus: LOADING_STATES.LOADING,
      };
    case ActionType.GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        moviesStatus: LOADING_STATES.SUCCEEDED,
        filteredMovies: action.payload,
      };
    case ActionType.GET_MOVIES_ERROR:
      return {
        ...state,
        moviesStatus: LOADING_STATES.FAILED,
      };
    default:
      return state;
  }
};
