import { APIRoute, AuthorizationStatus } from '../const';
import { ActionCreator } from './actions';
import { transformMovieData, transformUserData } from '../services/api';

export const getMovies = () => (dispatch, _, api) => {
  dispatch(ActionCreator.getMoviesRequest());
  api
    .get(APIRoute.MOVIES)
    .then(({ data }) => {
      dispatch(ActionCreator.getMoviesSuccess(data.map(transformMovieData)));
    })
    .catch((e) => dispatch(ActionCreator.getMoviesError(e)));
};

export const login =
  ({ email, password }) =>
  (dispatch, _, api) => {
    dispatch(ActionCreator.loginRequest());
    api
      .post(APIRoute.LOGIN, { email, password })
      .then(({ data }) => {
        const transformedData = transformUserData(data);
        localStorage.setItem('user', JSON.stringify(transformedData));

        dispatch(ActionCreator.loginSuccess(transformedData));
        dispatch(ActionCreator.changeAuthStatus(AuthorizationStatus.AUTH));
      })
      .catch((e) => {
        const { error } = e.response.data;

        dispatch(ActionCreator.loginError(error));
      });
  };

export const getAuthorizationStatus = () => (dispatch, _, api) => {
  api
    .get(APIRoute.LOGIN)
    .then(() => {
      dispatch(ActionCreator.changeAuthStatus(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.updateUser(JSON.parse(localStorage.getItem('user'))));
    })
    .catch(() => {});
};
