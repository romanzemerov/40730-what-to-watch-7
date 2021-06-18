import React, { useRef, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types';
import { moviePropTypes } from '../../types/movie.prop';

function MovieList({ movies }) {
  const [activeMovie, setActiveMovie] = useState('');

  const changeActiveMovieHandler = (movieId) => {
    setActiveMovie(movieId);
  };

  return (
    <>
      <div className="catalog__films-list">
        {movies.map((movie) => {
          const { id, name, posterImage, previewVideoLink, previewImage } =
            movie;
          const isActive = activeMovie === id;

          return (
            <MovieCard
              key={id}
              id={id}
              name={name}
              posterImage={posterImage}
              previewImage={previewImage}
              previewVideoLink={previewVideoLink}
              isActive={isActive}
              onChangeActiveMovie={changeActiveMovieHandler}
            />
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
