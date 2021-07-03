import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { AuthorizationStatus } from '../const';
import { authReducer } from './auth/reducer';
import { changeAuthStatus } from './auth/actions';
import { moviesReducer } from './movies/reducer';
import { filtersReducer } from './filters/reducer';
import { redirect } from './middlewares/redirect';

const api = createAPI(() => {
  store.dispatch(changeAuthStatus(AuthorizationStatus.NO_AUTH));
});

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
