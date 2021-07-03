import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FilterItem } from './components/filter-item';
import { moviePropTypes } from '../../../../../types/movie.prop';
import PropTypes from 'prop-types';
import { changeGenresFilter, clearGenresFilter } from '../../../../../store/filters/actions';
import { getMovies } from '../../../../../store/movies/selectors';
import { getGenre } from '../../../../../store/filters/selectors';

const ALL_GENRES = 'All genres';

function Filters({ movies, genre, changeFilter, clearFilter }) {
  const [activeGenre, setActiveGenre] = useState(genre);
  const genreLabels = [...new Set(movies.map((movie) => movie.genre))];

  const clearFilterHandler = () => {
    setActiveGenre('');
    clearFilter();
  };

  const changeGenreHandler = (label) => {
    setActiveGenre(label);
    changeFilter(label);
  };

  return (
    <ul className="catalog__genres-list">
      <FilterItem label={ALL_GENRES} isActive={!activeGenre} onClick={clearFilterHandler} />

      {genreLabels.map((label) => {
        const isActive = activeGenre === label;

        return (
          <FilterItem key={label} label={label} isActive={isActive} onClick={changeGenreHandler} />
        );
      })}
    </ul>
  );
}

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  genre: getGenre(state),
});

const mapDispatchToProps = {
  changeFilter: changeGenresFilter,
  clearFilter: clearGenresFilter,
};

Filters.propTypes = {
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
  genre: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

export { Filters };

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
