import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types';
import { moviePropTypes } from '../../types/movie.prop';

function MovieList({ movies }) {
  // const [activeMovie, setActiveMovie] = useState('');

  return (
    <>
      <div className="catalog__films-list">
        {movies.map((movie) => {
          const { id, name, posterImage } = movie;

          return (
            <MovieCard key={id} id={id} name={name} posterImage={posterImage} />
          );
        })}
      </div>

      <div className="catalog__more">
        <button className="catalog__button" type="button">
          Show more
        </button>
      </div>
    </>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
};

export { MovieList };
