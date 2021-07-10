import {
  changeAuthState,
  checkAuthStateRequest,
  checkAuthStateSuccess,
  loginError,
  loginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  updateUser
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
          localStorage.setItem('user', JSON.stringify(transformedData));

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
      localStorage.removeItem('user');
      dispatch(changeAuthState(AuthorizationStates.NO_AUTH));
      dispatch(logoutSuccess());
    })
    .catch(() => {});
};

export const checkAuthState = () => (dispatch, _, api) => {
  dispatch(checkAuthStateRequest());
  api
    .get(APIRoute.LOGIN)
    .then(() => {
      dispatch(checkAuthStateSuccess(AuthorizationStates.AUTH));
      dispatch(updateUser(JSON.parse(localStorage.getItem('user'))));
    })
    .catch(() => {
      dispatch(checkAuthStateSuccess(AuthorizationStates.NO_AUTH));
    });
};
