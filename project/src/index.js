import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app/app';
import { movies } from './mocks/movies';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App movies={movies} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
