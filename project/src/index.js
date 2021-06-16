import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';

import { movies } from './mocks/movies';

ReactDOM.render(
  <React.StrictMode>
    <App movies={movies} />
  </React.StrictMode>,
  document.getElementById('root'),
);
