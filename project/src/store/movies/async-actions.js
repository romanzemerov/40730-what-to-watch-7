import {
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
import { APIRoute, AppRoutes, HttpCodes } from '../../const';
import { transformMovieData } from '../../services/api';
import { redirectToRoute } from '../middlewares/redirect';

export const fetchMovies = () => (dispatch, _, api) => {
  dispatch(getMoviesRequest());
  api
    .get(APIRoute.MOVIES)
    .then(({ data }) => {
      dispatch(getMoviesSuccess(data.map(transformMovieData)));
    })
    .catch((e) => dispatch(getMoviesError(e)));
};

export const fetchMovie = (id) => (dispatch, _, api) => {
  dispatch(getMovieRequest());
  api
    .get(`${APIRoute.MOVIES}/${id}`)
    .then(({ data }) => {
      dispatch(getMovieSuccess(transformMovieData(data)));
    })
    .catch((e) => {
      const { status } = e.response;

      dispatch(getMovieError());

      if (status === HttpCodes.NOT_FOUND) {
        dispatch(redirectToRoute(AppRoutes.NOT_FOUND));
      }
    });
};

export const fetchSimilarFilms = (id) => (dispatch, _, api) => {
  dispatch(getSimilarMoviesRequest());
  api
    .get(`${APIRoute.MOVIES}/${id}${APIRoute.SIMILAR}`)
    .then(({ data }) => {
      dispatch(getSimilarMoviesSuccess(data.map(transformMovieData)));
    })
    .catch(() => dispatch(getSimilarMoviesError()));
};

export const changeFavorite =
  ({ id, status }) =>
    (dispatch, _, api) => {
      dispatch(changeFavoriteStatusRequest());
      api
        .post(`${APIRoute.FAVORITE}/${id}/${status}`)
        .then(({ data }) => {
          dispatch(changeFavoriteStatusSuccess(transformMovieData(data).isFavorite));
        })
        .catch(() => dispatch(changeFavoriteStatusError()));
    };
