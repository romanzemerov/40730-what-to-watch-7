import { movies } from '../mocks/movies';
import { ActionType } from './actions';

const initialState = {
  movies: movies,
  genre: '',
  filteredMovies: movies,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRES_FILTER:
      return {
        ...state,
        genre: action.payload,
        filteredMovies: movies.filter(({ genre }) => genre === action.payload),
      };
    case ActionType.CLEAR_GENRES_FILTER:
      return {
        ...state,
        genre: initialState.genre,
        filteredMovies: initialState.movies,
      };
    default:
      return state;
  }
};
