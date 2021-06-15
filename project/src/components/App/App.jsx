import React from 'react';
import { Main } from '../pages/Main/Main';
import PropTypes from 'prop-types';
import * as types from '../../types';

function App({ movies }) {
  return <Main movies={movies} />;
}

App.propTypes = {
  movies: PropTypes.arrayOf(types.movie).isRequired,
};

export { App };
