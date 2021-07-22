import { redirect, redirectToRoute } from './redirect';
import { AppRoutes } from '../../const';

const mockRedux = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();
  const invoke = (action) => redirect(store)(next)(action);

  return { store, next, invoke };
};

const fakeHistory = {
  location: { pathname: '' },
  push(path) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

describe('Middleware: redirect', () => {
  it('action should passes to next middleware', () => {
    const { invoke, next } = mockRedux();
    const action = redirectToRoute(AppRoutes.MAIN);

    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('route should be added to fakeHistory', () => {
    const { invoke } = mockRedux();

    invoke(redirectToRoute(AppRoutes.LOGIN));
    expect(fakeHistory.location.pathname).toBe(AppRoutes.LOGIN);

    invoke(redirectToRoute(AppRoutes.PLAYER));
    expect(fakeHistory.location.pathname).toBe(AppRoutes.PLAYER);
  });

  it('should not redirect because bad action', () => {
    const url = '/test-url';
    const { invoke } = mockRedux();

    invoke({ type: 'TEST_ACTION', payload: url });
    expect(fakeHistory.location.pathname).not.toBe(url);
  });
});
