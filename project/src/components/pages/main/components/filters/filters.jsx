import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  changeGenresFilter,
  clearGenresFilter,
} from '../../../../../store/actions';
import { FilterItem } from './components/filter-item';
import { moviePropTypes } from '../../../../../types/movie.prop';
import PropTypes from 'prop-types';

const ALL_GENRES = 'All genres';

function Filters({ movies, genre, changeGenresFilter, clearGenresFilter }) {
  const [activeGenre, setActiveGenre] = useState(genre);
  const genres = [...new Set(movies.map(({ genre }) => genre))];

  const clearFilterHandler = () => {
    setActiveGenre('');
    clearGenresFilter();
  };

  const changeGenreHandler = (label) => {
    setActiveGenre(label);
    changeGenresFilter(label);
  };

  return (
    <ul className="catalog__genres-list">
      <FilterItem
        label={ALL_GENRES}
        isActive={activeGenre === ''}
        onClick={clearFilterHandler}
      />

      {genres &&
        genres.map((genre) => {
          const isActive = activeGenre === genre;

          return (
            <FilterItem
              key={genre}
              label={genre}
              isActive={isActive}
              onClick={changeGenreHandler}
            />
          );
        })}
    </ul>
  );
}

const mapStateToProps = (state) => ({
  movies: state.movies,
  genre: state.genre,
});

const mapDispatchToProps = {
  changeGenresFilter,
  clearGenresFilter,
};

Filters.propTypes = {
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
  genre: PropTypes.string.isRequired,
  changeGenresFilter: PropTypes.func.isRequired,
  clearGenresFilter: PropTypes.func.isRequired,
};

export { Filters };

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
