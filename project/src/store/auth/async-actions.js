import {
  checkAuthStateError,
  checkAuthStateRequest,
  checkAuthStateSuccess,
  loginError,
  loginRequest,
  loginSuccess,
  logoutError,
  logoutRequest,
  logoutSuccess
} from './actions';
import { APIRoute } from '../../const';
import { transformUserData } from '../../services/api';

export const login =
  ({ email, password }) =>
    (dispatch, _, api) => {
      dispatch(loginRequest());
      api
        .post(APIRoute.LOGIN, { email, password })
        .then(({ data }) => {
          const transformedData = transformUserData(data);
          localStorage.setItem('token', transformedData.token);

          dispatch(loginSuccess(transformedData));
        })
        .catch((e) => {
          const { error } = e.response.data;

          dispatch(loginError(error));
        });
    };

export const logout = () => (dispatch, _, api) => {
  dispatch(logoutRequest());
  api
    .delete(APIRoute.LOGOUT)
    .then(() => {
      localStorage.removeItem('token');
      dispatch(logoutSuccess());
    })
    .catch(() => {
      dispatch(logoutError());
    });
};

export const checkAuthState = () => (dispatch, _, api) => {
  dispatch(checkAuthStateRequest());
  api
    .get(APIRoute.LOGIN)
    .then(({ data }) => {
      dispatch(checkAuthStateSuccess(transformUserData(data)));
    })
    .catch(() => {
      localStorage.removeItem('token');
      dispatch(checkAuthStateError());
    });
};
