import { Route } from 'react-router-dom';
import { NotFound } from '../pages/not-found/not-found';
import React from 'react';
import PropTypes from 'prop-types';
import { moviePropTypes } from '../../types/movie.prop';

function RouteWithCurrentMovie({
  component: Component,
  path,
  movies,
  ...rest
}) {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        const { id } = props.match.params;
        const currentMovie = movies.find((movie) => movie.id === id);

        return currentMovie ? (
          <Component movie={currentMovie} {...props} />
        ) : (
          <NotFound />
        );
      }}
    />
  );
}

RouteWithCurrentMovie.propTypes = {
  component: PropTypes.elementType.isRequired,
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
  path: PropTypes.string.isRequired,
};

export { RouteWithCurrentMovie };
