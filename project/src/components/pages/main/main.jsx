import React from 'react';
import PropTypes from 'prop-types';
import { moviePropTypes } from '../../../types/movie.prop';
import { MovieList } from '../../movie-list/movie-list';
import { PageFooter } from '../../page-footer/page-footer';
import Filters from './components/filters/filters';
import { connect } from 'react-redux';
import { getFilteredMovies } from '../../../store/filters/selectors';
import { PromoMovie } from './components/promo-movie/components/promo-movie';

function Main({ filteredMovies }) {
  return (
    <>
      <PromoMovie />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <Filters />
          <MovieList movies={filteredMovies} />
        </section>

        <PageFooter />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  filteredMovies: getFilteredMovies(state),
});

Main.propTypes = {
  filteredMovies: PropTypes.arrayOf(moviePropTypes).isRequired,
};

export { Main };

export default connect(mapStateToProps)(Main);
