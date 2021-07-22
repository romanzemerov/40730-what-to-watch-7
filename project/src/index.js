import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { checkAuthState } from './store/auth/async-actions';
import { fetchMovies } from './store/movies/async-actions';
import { fetchPromoMovie } from './store/promoMovie/async-actions';
import { Router } from 'react-router-dom';
import browserHistory from './browser-history';

store.dispatch(checkAuthState());
store.dispatch(fetchPromoMovie());
store.dispatch(fetchMovies());

ReactDOM.render(
  <React.StrictMode>
    <Router history={browserHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
