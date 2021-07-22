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
  logoutSuccess,
} from './actions';
import { AuthStates, LoadingStatus } from '../../const';

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
        loginStatus: LoadingStatus.LOADING,
        loginError: '',
        logoutStatus: LoadingStatus.IDLE,
        authState: AuthStates.UNKNOWN,
        authStatus: LoadingStatus.IDLE,
      });
    });
    it('should return the success download state', () => {
      const state = authReducer(undefined, loginSuccess(testUser));

      expect(state).toEqual({
        user: testUser,
        loginStatus: LoadingStatus.SUCCEEDED,
        loginError: '',
        logoutStatus: LoadingStatus.IDLE,
        authState: AuthStates.AUTH,
        authStatus: LoadingStatus.IDLE,
      });
    });
    it('should return the error state', () => {
      const state = authReducer(undefined, loginError('testError'));

      expect(state).toEqual({
        user: {},
        loginStatus: LoadingStatus.FAILED,
        loginError: 'testError',
        logoutStatus: LoadingStatus.IDLE,
        authState: AuthStates.NO_AUTH,
        authStatus: LoadingStatus.IDLE,
      });
    });
  });

  describe('Logout', () => {
    it('should return the download state', () => {
      const initialState = {
        user: testUser,
        loginStatus: LoadingStatus.SUCCEEDED,
        loginError: '',
        logoutStatus: LoadingStatus.IDLE,
        authState: AuthStates.AUTH,
        authStatus: LoadingStatus.IDLE,
      };
      const state = authReducer(initialState, logoutRequest());

      expect(state).toEqual({
        user: testUser,
        loginStatus: LoadingStatus.SUCCEEDED,
        loginError: '',
        logoutStatus: LoadingStatus.LOADING,
        authState: AuthStates.AUTH,
        authStatus: LoadingStatus.IDLE,
      });
    });
    it('should return the success download state', () => {
      const initialState = {
        user: testUser,
        loginStatus: LoadingStatus.SUCCEEDED,
        loginError: '',
        logoutStatus: LoadingStatus.SUCCEEDED,
        authState: AuthStates.AUTH,
        authStatus: LoadingStatus.IDLE,
      };
      const state = authReducer(initialState, logoutSuccess());

      expect(state).toEqual({
        user: {},
        loginStatus: LoadingStatus.SUCCEEDED,
        loginError: '',
        logoutStatus: LoadingStatus.SUCCEEDED,
        authState: AuthStates.NO_AUTH,
        authStatus: LoadingStatus.IDLE,
      });
    });
    it('should return the error state', () => {
      const initialState = {
        user: testUser,
        loginStatus: LoadingStatus.SUCCEEDED,
        loginError: '',
        logoutStatus: LoadingStatus.LOADING,
        authState: AuthStates.AUTH,
        authStatus: LoadingStatus.IDLE,
      };
      const state = authReducer(initialState, logoutError());

      expect(state).toEqual({
        user: testUser,
        loginStatus: LoadingStatus.SUCCEEDED,
        loginError: '',
        logoutStatus: LoadingStatus.FAILED,
        authState: AuthStates.AUTH,
        authStatus: LoadingStatus.IDLE,
      });
    });
  });

  describe('Check auth status', () => {
    it('should return the download state', () => {
      const initialState = {
        user: {},
        loginStatus: LoadingStatus.IDLE,
        loginError: '',
        logoutStatus: LoadingStatus.IDLE,
        authState: AuthStates.UNKNOWN,
        authStatus: LoadingStatus.IDLE,
      };
      const state = authReducer(initialState, checkAuthStateRequest());

      expect(state).toEqual({
        user: {},
        loginStatus: LoadingStatus.IDLE,
        loginError: '',
        logoutStatus: LoadingStatus.IDLE,
        authState: AuthStates.UNKNOWN,
        authStatus: LoadingStatus.LOADING,
      });
    });
    it('should return the success download state', () => {
      const initialState = {
        user: {},
        loginStatus: LoadingStatus.IDLE,
        loginError: '',
        logoutStatus: LoadingStatus.IDLE,
        authState: AuthStates.UNKNOWN,
        authStatus: LoadingStatus.LOADING,
      };
      const state = authReducer(initialState, checkAuthStateSuccess(testUser));

      expect(state).toEqual({
        user: testUser,
        loginStatus: LoadingStatus.IDLE,
        loginError: '',
        logoutStatus: LoadingStatus.IDLE,
        authState: AuthStates.AUTH,
        authStatus: LoadingStatus.SUCCEEDED,
      });
    });
    it('should return the error download state', () => {
      const initialState = {
        user: {},
        loginStatus: LoadingStatus.IDLE,
        loginError: '',
        logoutStatus: LoadingStatus.IDLE,
        authState: AuthStates.UNKNOWN,
        authStatus: LoadingStatus.LOADING,
      };
      const state = authReducer(initialState, checkAuthStateError());

      expect(state).toEqual({
        user: {},
        loginStatus: LoadingStatus.IDLE,
        loginError: '',
        logoutStatus: LoadingStatus.IDLE,
        authState: AuthStates.NO_AUTH,
        authStatus: LoadingStatus.FAILED,
      });
    });
  });

  describe('Change auth state', () => {
    it('should reset user data', () => {
      const initialState = {
        user: testUser,
        loginStatus: LoadingStatus.IDLE,
        loginError: '',
        logoutStatus: LoadingStatus.IDLE,
        authState: AuthStates.AUTH,
        authStatus: LoadingStatus.IDLE,
      };
      const state = authReducer(initialState, resetUserData(AuthStates.NO_AUTH));

      expect(state).toEqual({
        user: {},
        loginStatus: LoadingStatus.IDLE,
        loginError: '',
        logoutStatus: LoadingStatus.IDLE,
        authState: AuthStates.NO_AUTH,
        authStatus: LoadingStatus.IDLE,
      });
    });
  });
});
