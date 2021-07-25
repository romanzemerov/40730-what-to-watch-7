import React, { useCallback, useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { moviePropTypes } from '../../types/movie.prop';
import { ShowMore } from './components/show-more/show-more';
import { useFirstMountState } from '../../hooks/useFirstMountState';
import PropTypes from 'prop-types';

const MOVIES_COUNT = 8;

const useUpdateEffect = (effect, movies, page) => {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
  }, [isFirstMount, effect, movies, page]);
};

const getShowingMovies = (movies, page, maxMoviesCount = MOVIES_COUNT) =>
  movies.slice(0, page * maxMoviesCount);

function MovieList({ movies }) {
  const [activeMovie, setActiveMovie] = useState('');
  const [page, setPage] = useState(1);
  const [showingMovies, setShowingMovies] = useState(getShowingMovies(movies, page));

  const setShowingMoviesMemo = useCallback(
    () => setShowingMovies(getShowingMovies(movies, page)),
    [movies, page],
  );

  const changeActiveMovieHandler = (movieId) => {
    setActiveMovie(movieId);
  };

  const showMoreClickHandler = () => {
    setPage((prev) => prev + 1);
  };

  useUpdateEffect(setShowingMoviesMemo, movies, page);

  return (
    <>
      <div className="catalog__films-list">
        {showingMovies.map((movie) => {
          const { id, name, posterImage, previewVideoLink, previewImage } = movie;
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

      {movies.length !== showingMovies.length && <ShowMore onClick={showMoreClickHandler} />}
    </>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
};

export { MovieList };
