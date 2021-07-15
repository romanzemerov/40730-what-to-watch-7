import { authReducer } from './reducer';
import {
  resetUserData,
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
import { AuthStates, loadingStates } from '../../const';

const testUser = {
  id: 'testId',
  email: 'test@email.com',
  name: 'testName',
  avatarUrl: 'testAvatarUrl',
  token: 'testToken',
};

describe('Auth reducer', () => {
  describe('Login', () => {
    it('should return the download state', () => {
      const state = authReducer(undefined, loginRequest());

      expect(state).toEqual({
        user: {},
        loginStatus: loadingStates.LOADING,
        loginError: '',
        logoutStatus: loadingStates.IDLE,
        authState: AuthStates.UNKNOWN,
        authStatus: loadingStates.IDLE,
      });
    });
    it('should return the success download state', () => {
      const state = authReducer(undefined, loginSuccess(testUser));

      expect(state).toEqual({
        user: testUser,
        loginStatus: loadingStates.SUCCEEDED,
        loginError: '',
        logoutStatus: loadingStates.IDLE,
        authState: AuthStates.AUTH,
        authStatus: loadingStates.IDLE,
      });
    });
    it('should return the error state', () => {
      const state = authReducer(undefined, loginError('testError'));

      expect(state).toEqual({
        user: {},
        loginStatus: loadingStates.FAILED,
        loginError: 'testError',
        logoutStatus: loadingStates.IDLE,
        authState: AuthStates.NO_AUTH,
        authStatus: loadingStates.IDLE,
      });
    });
  });

  describe('Logout', () => {
    it('should return the download state', () => {
      const initialState = {
        user: testUser,
        loginStatus: loadingStates.SUCCEEDED,
        loginError: '',
        logoutStatus: loadingStates.IDLE,
        authState: AuthStates.AUTH,
        authStatus: loadingStates.IDLE,
      };
      const state = authReducer(initialState, logoutRequest());

      expect(state).toEqual({
        user: testUser,
        loginStatus: loadingStates.SUCCEEDED,
        loginError: '',
        logoutStatus: loadingStates.LOADING,
        authState: AuthStates.AUTH,
        authStatus: loadingStates.IDLE,
      });
    });
    it('should return the success download state', () => {
      const initialState = {
        user: testUser,
        loginStatus: loadingStates.SUCCEEDED,
        loginError: '',
        logoutStatus: loadingStates.SUCCEEDED,
        authState: AuthStates.AUTH,
        authStatus: loadingStates.IDLE,
      };
      const state = authReducer(initialState, logoutSuccess());

      expect(state).toEqual({
        user: {},
        loginStatus: loadingStates.SUCCEEDED,
        loginError: '',
        logoutStatus: loadingStates.SUCCEEDED,
        authState: AuthStates.NO_AUTH,
        authStatus: loadingStates.IDLE,
      });
    });
    it('should return the error state', () => {
      const initialState = {
        user: testUser,
        loginStatus: loadingStates.SUCCEEDED,
        loginError: '',
        logoutStatus: loadingStates.LOADING,
        authState: AuthStates.AUTH,
        authStatus: loadingStates.IDLE,
      };
      const state = authReducer(initialState, logoutError());

      expect(state).toEqual({
        user: testUser,
        loginStatus: loadingStates.SUCCEEDED,
        loginError: '',
        logoutStatus: loadingStates.FAILED,
        authState: AuthStates.AUTH,
        authStatus: loadingStates.IDLE,
      });
    });
  });

  describe('Check auth status', () => {
    it('should return the download state', () => {
      const initialState = {
        user: {},
        loginStatus: loadingStates.IDLE,
        loginError: '',
        logoutStatus: loadingStates.IDLE,
        authState: AuthStates.UNKNOWN,
        authStatus: loadingStates.IDLE,
      };
      const state = authReducer(initialState, checkAuthStateRequest());

      expect(state).toEqual({
        user: {},
        loginStatus: loadingStates.IDLE,
        loginError: '',
        logoutStatus: loadingStates.IDLE,
        authState: AuthStates.UNKNOWN,
        authStatus: loadingStates.LOADING,
      });
    });
    it('should return the success download state', () => {
      const initialState = {
        user: {},
        loginStatus: loadingStates.IDLE,
        loginError: '',
        logoutStatus: loadingStates.IDLE,
        authState: AuthStates.UNKNOWN,
        authStatus: loadingStates.LOADING,
      };
      const state = authReducer(initialState, checkAuthStateSuccess(testUser));

      expect(state).toEqual({
        user: testUser,
        loginStatus: loadingStates.IDLE,
        loginError: '',
        logoutStatus: loadingStates.IDLE,
        authState: AuthStates.AUTH,
        authStatus: loadingStates.SUCCEEDED,
      });
    });
    it('should return the error download state', () => {
      const initialState = {
        user: {},
        loginStatus: loadingStates.IDLE,
        loginError: '',
        logoutStatus: loadingStates.IDLE,
        authState: AuthStates.UNKNOWN,
        authStatus: loadingStates.LOADING,
      };
      const state = authReducer(initialState, checkAuthStateError());

      expect(state).toEqual({
        user: {},
        loginStatus: loadingStates.IDLE,
        loginError: '',
        logoutStatus: loadingStates.IDLE,
        authState: AuthStates.NO_AUTH,
        authStatus: loadingStates.FAILED,
      });
    });
  });

  describe('Change auth state', () => {
    it('should reset user data', () => {
      const initialState = {
        user: testUser,
        loginStatus: loadingStates.IDLE,
        loginError: '',
        logoutStatus: loadingStates.IDLE,
        authState: AuthStates.AUTH,
        authStatus: loadingStates.IDLE,
      };
      const state = authReducer(initialState, resetUserData(AuthStates.NO_AUTH));

      expect(state).toEqual({
        user: {},
        loginStatus: loadingStates.IDLE,
        loginError: '',
        logoutStatus: loadingStates.IDLE,
        authState: AuthStates.NO_AUTH,
        authStatus: loadingStates.IDLE,
      });
    });
  });
});
