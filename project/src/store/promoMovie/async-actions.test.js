import MockAdapter from 'axios-mock-adapter';
import { changeFavorite, fetchPromoMovie } from './async-actions';
import { APIRoute } from '../../const';
import { createAPI, transformMovieData } from '../../services/api';
import {
  changeFavoriteStatusError,
  changeFavoriteStatusRequest,
  changeFavoriteStatusSuccess,
  fetchMovieError,
  fetchMovieRequest,
  fetchMovieSuccess
} from './actions';
import { moviesMock } from '../../mocks/movies';

let api = null;

describe('Movies async actions', () => {
  beforeAll(() => {
    api = createAPI(() => {});
  });

  it('should make success promo movie request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const responseData = moviesMock[0];
    const fetchPromoMovieLoader = fetchPromoMovie();

    apiMock.onGet(APIRoute.PROMO).reply(200, responseData);

    return fetchPromoMovieLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchMovieRequest());
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        fetchMovieSuccess(transformMovieData(responseData)),
      );
    });
  });
  it('should make failed movies request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fetchPromoMovieLoader = fetchPromoMovie();

    apiMock.onGet(APIRoute.PROMO).reply(500);

    return fetchPromoMovieLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchMovieRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchMovieError());
    });
  });

  it('should make success change favorite request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieId = 'testId';
    const status = 'testStatus';
    const responseData = moviesMock[0];
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
