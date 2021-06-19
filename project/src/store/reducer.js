import { movies } from '../mocks/movies';

const initialState = {
  genre: '',
  movies: movies,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
