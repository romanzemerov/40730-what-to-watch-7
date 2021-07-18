import { moviesReducer } from './reducer';
import {
  getMoviesRequest,
  getMoviesSuccess,
  getMoviesError,
  getMovieRequest,
  getMovieSuccess,
  getMovieError,
  fetchFavoriteMoviesError,
  fetchFavoriteMoviesSuccess,
  fetchFavoriteMoviesRequest,
  getSimilarMoviesRequest,
  getSimilarMoviesSuccess,
  getSimilarMoviesError,
  changeFavoriteStatusRequest,
  changeFavoriteStatusSuccess,
  changeFavoriteStatusError
} from './actions';
import { loadingStates } from '../../const';

const testMovies = [
  { id: 1, name: 'testName1' },
  { id: 2, name: 'testName2' },
  { id: 3, name: 'testName3' },
];

describe('Comments reducer', () => {
  describe('Sets movies', () => {
    it('should return the download state', () => {
      const state = moviesReducer(undefined, getMoviesRequest());

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: loadingStates.IDLE,
        changeFavoriteStatus: loadingStates.IDLE,
        movies: [],
        moviesStatus: loadingStates.LOADING,
        similarMovies: [],
        similarMoviesStatus: loadingStates.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.IDLE,
      });
    });

    it('should return the success download state', () => {
      const state = moviesReducer(undefined, getMoviesSuccess(testMovies));

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: loadingStates.IDLE,
        changeFavoriteStatus: loadingStates.IDLE,
        movies: testMovies,
        moviesStatus: loadingStates.SUCCEEDED,
        similarMovies: [],
        similarMoviesStatus: loadingStates.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.IDLE,
      });
    });

    it('should return the error state', () => {
      const state = moviesReducer(undefined, getMoviesError());

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: loadingStates.IDLE,
        changeFavoriteStatus: loadingStates.IDLE,
        movies: [],
        moviesStatus: loadingStates.FAILED,
        similarMovies: [],
        similarMoviesStatus: loadingStates.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.IDLE,
      });
    });
  });

  describe('Set current movie', () => {
    it('should return the download state', () => {
      const state = moviesReducer(undefined, getMovieRequest());

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: loadingStates.LOADING,
        changeFavoriteStatus: loadingStates.IDLE,
        movies: [],
        moviesStatus: loadingStates.IDLE,
        similarMovies: [],
        similarMoviesStatus: loadingStates.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.IDLE,
      });
    });

    it('should return the success download state', () => {
      const state = moviesReducer(undefined, getMovieSuccess(testMovies[0]));

      expect(state).toEqual({
        currentMovie: testMovies[0],
        currentMovieStatus: loadingStates.SUCCEEDED,
        changeFavoriteStatus: loadingStates.IDLE,
        movies: [],
        moviesStatus: loadingStates.IDLE,
        similarMovies: [],
        similarMoviesStatus: loadingStates.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.IDLE,
      });
    });

    it('should return the error state', () => {
      const state = moviesReducer(undefined, getMovieError());

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: loadingStates.FAILED,
        changeFavoriteStatus: loadingStates.IDLE,
        movies: [],
        moviesStatus: loadingStates.IDLE,
        similarMovies: [],
        similarMoviesStatus: loadingStates.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.IDLE,
      });
    });
  });

  describe('Set similar movies', () => {
    it('should return the download state', () => {
      const state = moviesReducer(undefined, getSimilarMoviesRequest());

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: loadingStates.IDLE,
        changeFavoriteStatus: loadingStates.IDLE,
        movies: [],
        moviesStatus: loadingStates.IDLE,
        similarMovies: [],
        similarMoviesStatus: loadingStates.LOADING,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.IDLE,
      });
    });

    it('should return the success download state', () => {
      const state = moviesReducer(undefined, getSimilarMoviesSuccess(testMovies));

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: loadingStates.IDLE,
        changeFavoriteStatus: loadingStates.IDLE,
        movies: [],
        moviesStatus: loadingStates.IDLE,
        similarMovies: testMovies,
        similarMoviesStatus: loadingStates.SUCCEEDED,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.IDLE,
      });
    });

    it('should return the error state', () => {
      const state = moviesReducer(undefined, getSimilarMoviesError());

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: loadingStates.IDLE,
        changeFavoriteStatus: loadingStates.IDLE,
        movies: [],
        moviesStatus: loadingStates.IDLE,
        similarMovies: [],
        similarMoviesStatus: loadingStates.FAILED,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.IDLE,
      });
    });
  });

  describe('Set isFavorites movies', () => {
    it('should return the download state', () => {
      const state = moviesReducer(undefined, fetchFavoriteMoviesRequest());

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: loadingStates.IDLE,
        changeFavoriteStatus: loadingStates.IDLE,
        movies: [],
        moviesStatus: loadingStates.IDLE,
        similarMovies: [],
        similarMoviesStatus: loadingStates.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.LOADING,
      });
    });

    it('should return the success download state', () => {
      const state = moviesReducer(undefined, fetchFavoriteMoviesSuccess(testMovies));

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: loadingStates.IDLE,
        changeFavoriteStatus: loadingStates.IDLE,
        movies: [],
        moviesStatus: loadingStates.IDLE,
        similarMovies: [],
        similarMoviesStatus: loadingStates.IDLE,
        favoriteMovies: testMovies,
        favoriteMoviesStatus: loadingStates.SUCCEEDED,
      });
    });

    it('should return the error state', () => {
      const state = moviesReducer(undefined, fetchFavoriteMoviesError());

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: loadingStates.IDLE,
        changeFavoriteStatus: loadingStates.IDLE,
        movies: [],
        moviesStatus: loadingStates.IDLE,
        similarMovies: [],
        similarMoviesStatus: loadingStates.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.FAILED,
      });
    });
  });

  describe('Change favourite field in current movie', () => {
    it('should return the download state', () => {
      const initialState = {
        currentMovie: { id: 1, isFavorite: true, name: 'testName1' },
        currentMovieStatus: loadingStates.IDLE,
        changeFavoriteStatus: loadingStates.IDLE,
        movies: [],
        moviesStatus: loadingStates.IDLE,
        similarMovies: [],
        similarMoviesStatus: loadingStates.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.IDLE,
      };
      const state = moviesReducer(initialState, changeFavoriteStatusRequest());

      expect(state).toEqual({
        currentMovie: { id: 1, isFavorite: true, name: 'testName1' },
        currentMovieStatus: loadingStates.IDLE,
        changeFavoriteStatus: loadingStates.LOADING,
        movies: [],
        moviesStatus: loadingStates.IDLE,
        similarMovies: [],
        similarMoviesStatus: loadingStates.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.IDLE,
      });
    });

    it('should return the success download state', () => {
      const initialState = {
        currentMovie: { id: 1, isFavorite: true, name: 'testName1' },
        currentMovieStatus: loadingStates.IDLE,
        changeFavoriteStatus: loadingStates.IDLE,
        movies: [],
        moviesStatus: loadingStates.IDLE,
        similarMovies: [],
        similarMoviesStatus: loadingStates.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.IDLE,
      };
      const state = moviesReducer(initialState, changeFavoriteStatusSuccess(false));

      expect(state).toEqual({
        currentMovie: { id: 1, isFavorite: false, name: 'testName1' },
        currentMovieStatus: loadingStates.IDLE,
        changeFavoriteStatus: loadingStates.SUCCEEDED,
        movies: [],
        moviesStatus: loadingStates.IDLE,
        similarMovies: [],
        similarMoviesStatus: loadingStates.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.IDLE,
      });
    });

    it('should return the error state', () => {
      const initialState = {
        currentMovie: { id: 1, isFavorite: true, name: 'testName1' },
        currentMovieStatus: loadingStates.IDLE,
        changeFavoriteStatus: loadingStates.IDLE,
        movies: [],
        moviesStatus: loadingStates.IDLE,
        similarMovies: [],
        similarMoviesStatus: loadingStates.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.IDLE,
      };
      const state = moviesReducer(initialState, changeFavoriteStatusError());

      expect(state).toEqual({
        currentMovie: { id: 1, isFavorite: true, name: 'testName1' },
        currentMovieStatus: loadingStates.IDLE,
        changeFavoriteStatus: loadingStates.FAILED,
        movies: [],
        moviesStatus: loadingStates.IDLE,
        similarMovies: [],
        similarMoviesStatus: loadingStates.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: loadingStates.IDLE,
      });
    });
  });
});
