import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createAPI } from '../services/api';
import { ActionCreator } from './actions';
import { AuthorizationStatus } from '../const';

const api = createAPI(() => {
  store.dispatch(ActionCreator.changeAuthStatus(AuthorizationStatus.NO_AUTH));
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
