import { getMoviesError, getMoviesRequest, getMoviesSuccess } from './actions';
import { APIRoute } from '../../const';
import { transformMovieData } from '../../services/api';

export const fetchMovies = () => (dispatch, _, api) => {
  dispatch(getMoviesRequest());
  api
    .get(APIRoute.MOVIES)
    .then(({ data }) => {
      dispatch(getMoviesSuccess(data.map(transformMovieData)));
    })
    .catch((e) => dispatch(getMoviesError(e)));
};
