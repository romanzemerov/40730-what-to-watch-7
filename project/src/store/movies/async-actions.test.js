import MockAdapter from 'axios-mock-adapter';
import {
  changeFavorite,
  fetchFavoriteMovies,
  fetchMovie,
  fetchMovies,
  fetchSimilarFilms
} from './async-actions';
import { APIRoute, AppRoutes, HttpCodes } from '../../const';
import { createAPI, transformMovieData } from '../../services/api';
import {
  changeFavoriteStatusError,
  changeFavoriteStatusRequest,
  changeFavoriteStatusSuccess,
  fetchFavoriteMoviesError,
  fetchFavoriteMoviesRequest,
  fetchFavoriteMoviesSuccess,
  getMovieError,
  getMovieRequest,
  getMoviesError,
  getMoviesRequest,
  getMoviesSuccess,
  getMovieSuccess,
  getSimilarMoviesError,
  getSimilarMoviesRequest,
  getSimilarMoviesSuccess
} from './actions';
import { moviesMock } from '../../mocks/movies';
import { redirectToRoute } from '../middlewares/redirect';

const parsedMoviesMock = JSON.parse(moviesMock);
let api = null;

describe('Movies async actions', () => {
  beforeAll(() => {
    api = createAPI(() => {});
  });

  it('should make success movies request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const responseData = parsedMoviesMock;
    const fetchMoviesLoader = fetchMovies();

    apiMock.onGet(APIRoute.MOVIES).reply(200, responseData);

    return fetchMoviesLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, getMoviesRequest());
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        getMoviesSuccess(responseData.map(transformMovieData)),
      );
    });
  });
  it('should make failed movies request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fetchMoviesLoader = fetchMovies();

    apiMock.onGet(APIRoute.MOVIES).reply(500);

    return fetchMoviesLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, getMoviesRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, getMoviesError());
    });
  });

  it('should make success movie request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieId = 'testId';
    const responseData = parsedMoviesMock[0];
    const fetchMovieLoader = fetchMovie(movieId);

    apiMock.onGet(`${APIRoute.MOVIES}/${movieId}`).reply(200, responseData);

    return fetchMovieLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, getMovieRequest());
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        getMovieSuccess(transformMovieData(responseData)),
      );
    });
  });
  it('should make failed movie request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieId = 'testId';
    const fetchMovieLoader = fetchMovie(movieId);

    apiMock.onGet(`${APIRoute.MOVIES}/${movieId}`).reply(HttpCodes.NOT_FOUND);

    return fetchMovieLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, getMovieRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, getMovieError());
      expect(dispatch).toHaveBeenNthCalledWith(3, redirectToRoute(AppRoutes.NOT_FOUND));
    });
  });

  it('should make success similar movies request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieId = 'testId';
    const responseData = parsedMoviesMock;
    const fetchSimilarFilmsLoader = fetchSimilarFilms(movieId);

    apiMock.onGet(`${APIRoute.MOVIES}/${movieId}${APIRoute.SIMILAR}`).reply(200, responseData);

    return fetchSimilarFilmsLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, getSimilarMoviesRequest());
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        getSimilarMoviesSuccess(responseData.map(transformMovieData)),
      );
    });
  });
  it('should make failed similar movies request', () => {
    const apiMock = new MockAdapter(api);
    const movieId = 'testId';
    const dispatch = jest.fn();
    const fetchSimilarFilmsLoader = fetchSimilarFilms();

    apiMock.onGet(`${APIRoute.MOVIES}/${movieId}${APIRoute.SIMILAR}`).reply(500);

    return fetchSimilarFilmsLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, getSimilarMoviesRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, getSimilarMoviesError());
    });
  });

  it('should make success favorite movies request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const responseData = parsedMoviesMock;
    const fetchFavoriteMoviesLoader = fetchFavoriteMovies();

    apiMock.onGet(APIRoute.FAVORITE).reply(200, responseData);

    return fetchFavoriteMoviesLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchFavoriteMoviesRequest());
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        fetchFavoriteMoviesSuccess(responseData.map(transformMovieData)),
      );
    });
  });
  it('should make failed favorite movies request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fetchFavoriteMoviesLoader = fetchFavoriteMovies();

    apiMock.onGet(APIRoute.FAVORITE).reply(500);

    return fetchFavoriteMoviesLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchFavoriteMoviesRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchFavoriteMoviesError());
    });
  });

  it('should make success change favorite request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieId = 'testId';
    const status = 'testStatus';
    const responseData = parsedMoviesMock[0];
    const changeFavoriteLoader = changeFavorite({ id: movieId, status });

    apiMock.onPost(`${APIRoute.FAVORITE}/${movieId}/${status}`).reply(200, responseData);

    return changeFavoriteLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, changeFavoriteStatusRequest());
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        changeFavoriteStatusSuccess(transformMovieData(responseData).isFavorite),
      );
    });
  });
  it('should make failed change favorite request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieId = 'testId';
    const status = 'testStatus';
    const changeFavoriteLoader = changeFavorite({ id: movieId, status });

    apiMock.onPost(`${APIRoute.FAVORITE}/${movieId}/${status}`).reply(500);

    return changeFavoriteLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, changeFavoriteStatusRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, changeFavoriteStatusError());
    });
  });
});
