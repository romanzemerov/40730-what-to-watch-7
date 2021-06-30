import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { AuthorizationStatus } from '../const';
import { authReducer } from './auth/reducer';
import { changeAuthStatus } from './auth/actions';
import { dataReducer } from './data/reducer';
import { filtersReducer } from './filters/reducer';

const api = createAPI(() => {
  store.dispatch(changeAuthStatus(AuthorizationStatus.NO_AUTH));
});

export const store = configureStore({
  reducer: {
    data: dataReducer,
    auth: authReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
