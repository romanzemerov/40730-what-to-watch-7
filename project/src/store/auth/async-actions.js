import { changeAuthStatus, loginError, loginRequest, loginSuccess, updateUser } from './actions';
import { APIRoute, AuthorizationStatus } from '../../const';
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
          dispatch(changeAuthStatus(AuthorizationStatus.AUTH));
        })
        .catch((e) => {
          const { error } = e.response.data;

          dispatch(loginError(error));
        });
    };

export const fetchAuthorizationStatus = () => (dispatch, _, api) => {
  api
    .get(APIRoute.LOGIN)
    .then(() => {
      dispatch(changeAuthStatus(AuthorizationStatus.AUTH));
      dispatch(updateUser(JSON.parse(localStorage.getItem('user'))));
    })
    .catch(() => {});
};