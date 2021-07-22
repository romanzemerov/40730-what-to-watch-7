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
import { LoadingStatus } from '../../const';

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
        currentMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.IDLE,
        movies: [],
        moviesStatus: LoadingStatus.LOADING,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.IDLE,
      });
    });

    it('should return the success download state', () => {
      const state = moviesReducer(undefined, getMoviesSuccess(testMovies));

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.IDLE,
        movies: testMovies,
        moviesStatus: LoadingStatus.SUCCEEDED,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.IDLE,
      });
    });

    it('should return the error state', () => {
      const state = moviesReducer(undefined, getMoviesError());

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.IDLE,
        movies: [],
        moviesStatus: LoadingStatus.FAILED,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.IDLE,
      });
    });
  });

  describe('Set current movie', () => {
    it('should return the download state', () => {
      const state = moviesReducer(undefined, getMovieRequest());

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: LoadingStatus.LOADING,
        changeFavoriteStatus: LoadingStatus.IDLE,
        movies: [],
        moviesStatus: LoadingStatus.IDLE,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.IDLE,
      });
    });

    it('should return the success download state', () => {
      const state = moviesReducer(undefined, getMovieSuccess(testMovies[0]));

      expect(state).toEqual({
        currentMovie: testMovies[0],
        currentMovieStatus: LoadingStatus.SUCCEEDED,
        changeFavoriteStatus: LoadingStatus.IDLE,
        movies: [],
        moviesStatus: LoadingStatus.IDLE,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.IDLE,
      });
    });

    it('should return the error state', () => {
      const state = moviesReducer(undefined, getMovieError());

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: LoadingStatus.FAILED,
        changeFavoriteStatus: LoadingStatus.IDLE,
        movies: [],
        moviesStatus: LoadingStatus.IDLE,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.IDLE,
      });
    });
  });

  describe('Set similar movies', () => {
    it('should return the download state', () => {
      const state = moviesReducer(undefined, getSimilarMoviesRequest());

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.IDLE,
        movies: [],
        moviesStatus: LoadingStatus.IDLE,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.LOADING,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.IDLE,
      });
    });

    it('should return the success download state', () => {
      const state = moviesReducer(undefined, getSimilarMoviesSuccess(testMovies));

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.IDLE,
        movies: [],
        moviesStatus: LoadingStatus.IDLE,
        similarMovies: testMovies,
        similarMoviesStatus: LoadingStatus.SUCCEEDED,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.IDLE,
      });
    });

    it('should return the error state', () => {
      const state = moviesReducer(undefined, getSimilarMoviesError());

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.IDLE,
        movies: [],
        moviesStatus: LoadingStatus.IDLE,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.FAILED,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.IDLE,
      });
    });
  });

  describe('Set isFavorites movies', () => {
    it('should return the download state', () => {
      const state = moviesReducer(undefined, fetchFavoriteMoviesRequest());

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.IDLE,
        movies: [],
        moviesStatus: LoadingStatus.IDLE,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.LOADING,
      });
    });

    it('should return the success download state', () => {
      const state = moviesReducer(undefined, fetchFavoriteMoviesSuccess(testMovies));

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.IDLE,
        movies: [],
        moviesStatus: LoadingStatus.IDLE,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.IDLE,
        favoriteMovies: testMovies,
        favoriteMoviesStatus: LoadingStatus.SUCCEEDED,
      });
    });

    it('should return the error state', () => {
      const state = moviesReducer(undefined, fetchFavoriteMoviesError());

      expect(state).toEqual({
        currentMovie: {},
        currentMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.IDLE,
        movies: [],
        moviesStatus: LoadingStatus.IDLE,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.FAILED,
      });
    });
  });

  describe('Change favourite field in current movie', () => {
    it('should return the download state', () => {
      const initialState = {
        currentMovie: { id: 1, isFavorite: true, name: 'testName1' },
        currentMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.IDLE,
        movies: [],
        moviesStatus: LoadingStatus.IDLE,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.IDLE,
      };
      const state = moviesReducer(initialState, changeFavoriteStatusRequest());

      expect(state).toEqual({
        currentMovie: { id: 1, isFavorite: true, name: 'testName1' },
        currentMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.LOADING,
        movies: [],
        moviesStatus: LoadingStatus.IDLE,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.IDLE,
      });
    });

    it('should return the success download state', () => {
      const initialState = {
        currentMovie: { id: 1, isFavorite: true, name: 'testName1' },
        currentMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.IDLE,
        movies: [],
        moviesStatus: LoadingStatus.IDLE,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.IDLE,
      };
      const state = moviesReducer(initialState, changeFavoriteStatusSuccess(false));

      expect(state).toEqual({
        currentMovie: { id: 1, isFavorite: false, name: 'testName1' },
        currentMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.SUCCEEDED,
        movies: [],
        moviesStatus: LoadingStatus.IDLE,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.IDLE,
      });
    });

    it('should return the error state', () => {
      const initialState = {
        currentMovie: { id: 1, isFavorite: true, name: 'testName1' },
        currentMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.IDLE,
        movies: [],
        moviesStatus: LoadingStatus.IDLE,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.IDLE,
      };
      const state = moviesReducer(initialState, changeFavoriteStatusError());

      expect(state).toEqual({
        currentMovie: { id: 1, isFavorite: true, name: 'testName1' },
        currentMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.FAILED,
        movies: [],
        moviesStatus: LoadingStatus.IDLE,
        similarMovies: [],
        similarMoviesStatus: LoadingStatus.IDLE,
        favoriteMovies: [],
        favoriteMoviesStatus: LoadingStatus.IDLE,
      });
    });
  });
});
