import { APIRoute } from '../../const';
import { transformMovieData } from '../../services/api';
import {
  changeFavoriteStatusError,
  changeFavoriteStatusRequest,
  changeFavoriteStatusSuccess,
  fetchMovieError,
  fetchMovieRequest,
  fetchMovieSuccess
} from './actions';

export const fetchPromoMovie = () => (dispatch, _, api) => {
  dispatch(fetchMovieRequest());
  return api
    .get(APIRoute.PROMO)
    .then(({ data }) => {
      dispatch(fetchMovieSuccess(transformMovieData(data)));
    })
    .catch(() => dispatch(fetchMovieError()));
};

export const changeFavorite =
  ({ id, status }) =>
    (dispatch, _, api) => {
      dispatch(changeFavoriteStatusRequest());
      return api
        .post(`${APIRoute.FAVORITE}/${id}/${status}`)
        .then(({ data }) => {
          dispatch(changeFavoriteStatusSuccess(transformMovieData(data).isFavorite));
        })
        .catch(() => dispatch(changeFavoriteStatusError()));
    };
