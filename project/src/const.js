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
};

export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
};
