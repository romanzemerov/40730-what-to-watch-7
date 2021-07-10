export const HttpCodes = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

export const AppRoutes = {
  MAIN: '/',
  SIGN_IN: '/login',
  MOVIE: '/films/:id',
  PLAYER: '/player/:id',
  WATCH_LIST: '/mylist',
  ADD_REVIEW: '/films/:id/review',
  NOT_FOUND: '/404',
};

export const APIRoute = {
  MOVIES: '/films',
  LOGIN: '/login',
  SIMILAR: '/similar',
  COMMENTS: '/comments',
  PROMO: '/promo',
  FAVORITE: '/favorite',
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
