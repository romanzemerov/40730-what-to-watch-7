import { APIRoute } from '../const';
import { ActionCreator } from './actions';
import { transformMovieData } from '../services/api';

export const getMovies = () => (dispatch, _, api) => {
  dispatch(ActionCreator.getMoviesRequest());
  api
    .get(APIRoute.MOVIES, {
      transformResponse: [(data) => JSON.parse(data).map(transformMovieData)],
    })
    .then(({ data }) => {
      dispatch(ActionCreator.getMoviesSuccess(data));
    })
    .catch((e) => dispatch(ActionCreator.getMoviesError(e)));
};
