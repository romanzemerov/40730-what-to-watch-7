import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { fetchAuthorizationStatus } from './store/auth/async-actions';
import { fetchMovies } from './store/data/async-actions';

store.dispatch(fetchMovies());
store.dispatch(fetchAuthorizationStatus());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
