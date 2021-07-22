import MockAdapter from 'axios-mock-adapter';
import { checkAuthState, login, logout } from './async-actions';
import { APIRoute } from '../../const';
import { createAPI, transformUserData } from '../../services/api';
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
import { userMock } from '../../mocks/user';

let api = null;

describe('Auth async actions', () => {
  beforeAll(() => {
    api = createAPI(() => {});
  });

  it('should make success login request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const testUser = { email: 'test@test.com', password: 'testPassword' };
    const responseData = userMock;
    const loginLoader = login(testUser);
    Storage.prototype.setItem = jest.fn();

    apiMock.onPost(APIRoute.LOGIN).reply(200, responseData);

    return loginLoader(dispatch, () => {}, api).then(() => {
      expect(Storage.prototype.setItem).nthCalledWith(1, 'token', 'testToken');
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, loginRequest());
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        loginSuccess({
          id: 'testId',
          email: 'testEmail',
          name: 'testName',
          avatarUrl: 'testAvatarUrl',
          token: 'testToken',
        }),
      );
    });
  });
  it('should make failed login request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const testUser = { email: 'test@test.com', password: 'testPassword' };
    const responseData = {
      error: 'testError',
    };
    const loginLoader = login(testUser);

    apiMock.onPost(APIRoute.LOGIN).reply(500, responseData);

    return loginLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, loginRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, loginError('testError'));
    });
  });

  it('should make success logout request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loginLoader = logout();

    Storage.prototype.removeItem = jest.fn();

    apiMock.onDelete(APIRoute.LOGOUT).reply(204);

    return loginLoader(dispatch, () => {}, api).then(() => {
      expect(Storage.prototype.removeItem).nthCalledWith(1, 'token');
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, logoutRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, logoutSuccess());
    });
  });
  it('should make failed logout request', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loginLoader = logout();

    apiMock.onDelete(APIRoute.LOGOUT).reply(500);

    return loginLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, logoutRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, logoutError());
    });
  });

  it('should make success auth check', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const responseData = userMock;
    const checkAuthStateLoader = checkAuthState();

    apiMock.onGet(APIRoute.LOGIN).reply(200, responseData);

    return checkAuthStateLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, checkAuthStateRequest());
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        checkAuthStateSuccess(transformUserData(responseData)),
      );
    });
  });
  it('should make failed auth check', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthStateLoader = checkAuthState();

    Storage.prototype.removeItem = jest.fn();

    apiMock.onGet(APIRoute.LOGIN).reply(500);

    return checkAuthStateLoader(dispatch, () => {}, api).then(() => {
      expect(Storage.prototype.removeItem).nthCalledWith(1, 'token');
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, checkAuthStateRequest());
      expect(dispatch).toHaveBeenNthCalledWith(2, checkAuthStateError());
    });
  });
});
