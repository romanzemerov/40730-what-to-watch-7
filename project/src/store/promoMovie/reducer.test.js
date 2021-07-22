import { promoMovieReducer } from './reducer';
import {
  changeFavoriteStatusRequest,
  changeFavoriteStatusSuccess,
  changeFavoriteStatusError,
  fetchMovieRequest,
  fetchMovieSuccess,
  fetchMovieError,
} from './actions';
import { LoadingStatus } from '../../const';

describe('PromoMovie reducer', () => {
  describe('Set promo movie', () => {
    it('should return the download state', () => {
      const state = promoMovieReducer(undefined, fetchMovieRequest());

      expect(state).toEqual({
        promoMovie: {},
        promoMovieStatus: LoadingStatus.LOADING,
        changeFavoriteStatus: LoadingStatus.IDLE,
      });
    });

    it('should return the success download state', () => {
      const state = promoMovieReducer(
        undefined,
        fetchMovieSuccess({ id: 'testId', name: 'testName' }),
      );

      expect(state).toEqual({
        promoMovie: { id: 'testId', name: 'testName' },
        promoMovieStatus: LoadingStatus.SUCCEEDED,
        changeFavoriteStatus: LoadingStatus.IDLE,
      });
    });

    it('should return the error state', () => {
      const state = promoMovieReducer(undefined, fetchMovieError());

      expect(state).toEqual({
        promoMovie: {},
        promoMovieStatus: LoadingStatus.FAILED,
        changeFavoriteStatus: LoadingStatus.IDLE,
      });
    });
  });

  describe('Change favourite field in promo movie', () => {
    it('should return the download state', () => {
      const initialState = {
        promoMovie: { id: 1, isFavorite: true, name: 'testName1' },
        promoMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.LOADING,
      };
      const state = promoMovieReducer(initialState, changeFavoriteStatusRequest());

      expect(state).toEqual({
        promoMovie: { id: 1, isFavorite: true, name: 'testName1' },
        promoMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.LOADING,
      });
    });

    it('should return', () => {
      const initialState = {
        promoMovie: { id: 1, isFavorite: true, name: 'testName1' },
        promoMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.IDLE,
      };
      const state = promoMovieReducer(initialState, changeFavoriteStatusSuccess(false));

      expect(state).toEqual({
        promoMovie: { id: 1, isFavorite: false, name: 'testName1' },
        promoMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.SUCCEEDED,
      });
    });

    it('should return the error state', () => {
      const initialState = {
        promoMovie: {},
        promoMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.IDLE,
      };
      const state = promoMovieReducer(initialState, changeFavoriteStatusError());

      expect(state).toEqual({
        promoMovie: {},
        promoMovieStatus: LoadingStatus.IDLE,
        changeFavoriteStatus: LoadingStatus.FAILED,
      });
    });
  });
});
