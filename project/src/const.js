export const AppRoutes = {
  MAIN: '/',
  SIGN_IN: '/login',
  MOVIE: '/films/:id',
  PLAYER: '/player/:id',
  WATCH_LIST: '/mylist',
  ADD_REVIEW: '/films/:id/review',
};

export const APIRoute = {
  MOVIES: '/films',
  LOGIN: '/login',
};

export const loadingStates = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};
