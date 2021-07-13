import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { AuthStates } from '../const';
import { authReducer } from './auth/reducer';
import { changeAuthState } from './auth/actions';
import { moviesReducer } from './movies/reducer';
import { filtersReducer } from './filters/reducer';
import { redirect } from './middlewares/redirect';
import { commentsReducer } from './comments/reducer';
import { promoMovieReducer } from './promoMovie/reducer';

const api = createAPI(() => {
  store.dispatch(changeAuthState(AuthStates.NO_AUTH));
});

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
    filters: filtersReducer,
    comments: commentsReducer,
    promoMovie: promoMovieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
