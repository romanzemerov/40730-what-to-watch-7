import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { checkAuthState } from './store/auth/async-actions';
import { fetchMovies } from './store/movies/async-actions';
import { fetchPromoMovie } from './store/promoMovie/async-actions';

store.dispatch(checkAuthState());
store.dispatch(fetchPromoMovie());
store.dispatch(fetchMovies());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
