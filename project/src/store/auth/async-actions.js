import {
  changeAuthState,
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
import { APIRoute, AuthorizationStates } from '../../const';
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
          dispatch(changeAuthState(AuthorizationStates.AUTH));
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
      dispatch(changeAuthState(AuthorizationStates.NO_AUTH));
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
      dispatch(changeAuthState(AuthorizationStates.AUTH));
      dispatch(checkAuthStateSuccess(transformUserData(data)));
    })
    .catch(() => {
      dispatch(checkAuthStateError());
    });
};
