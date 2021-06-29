import React from 'react';
import { PageFooter } from '../../page-footer/page-footer';
import { MovieList } from '../../movie-list/movie-list';
import PageHeader from '../../page-header/page-header';
import { moviePropTypes } from '../../../types/movie.prop';
import PropTypes from 'prop-types';

function WatchList({ movies }) {
  return (
    <div>
      <div className="user-page">
        <PageHeader title={'My list'} />

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <MovieList movies={movies} />
        </section>

        <PageFooter />
      </div>
    </div>
  );
}

WatchList.propTypes = {
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
};

export { WatchList };
