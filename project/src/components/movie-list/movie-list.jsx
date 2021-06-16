import React, { useEffect, useRef, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import PropTypes from 'prop-types';
import { moviePropTypes } from '../../types/movie.prop';

function MovieList({ movies }) {
  const [activeMovie, setActiveMovie] = useState('');
  const listRef = useRef(null);

  const videoEndedHandler = () => {
    setActiveMovie('');
  };

  useEffect(() => {
    const listNode = listRef.current;
    let currentCardNode;
    let timeoutId;

    listNode.onmouseover = (e) => {
      if (currentCardNode) {
        return;
      }

      const cardNode = e.target.closest('.small-film-card[data-id]');
      if (!cardNode) {
        return;
      }

      currentCardNode = cardNode;

      timeoutId = setTimeout(() => {
        const cardId = currentCardNode.dataset.id;
        setActiveMovie(cardId);
      }, 1000);
    };

    listNode.onmouseout = (e) => {
      if (!currentCardNode) {
        return;
      }

      const cardNode = e.relatedTarget?.closest('.small-film-card[data-id]');
      if (cardNode && cardNode === currentCardNode) {
        return;
      }

      setActiveMovie(null);
      clearTimeout(timeoutId);
      currentCardNode = null;
    };

    return () => {
      listNode.onmouseover = null;
      listNode.onmouseout = null;
    };
  }, []);

  return (
    <>
      <div className="catalog__films-list" ref={listRef}>
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
              videoEndedHandler={videoEndedHandler}
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
