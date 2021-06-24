import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { VideoPlayer } from '../video-player/video-player';

const SHOW_PLAYER_TIMEOUT = 1000;

function MovieCard({
  id,
  name,
  posterImage,
  previewImage,
  previewVideoLink,
  isActive,
  onChangeActiveMovie,
}) {
  const timeoutId = useRef(null);

  const mouseEnterHandler = () => {
    timeoutId.current = setTimeout(() => onChangeActiveMovie(id), SHOW_PLAYER_TIMEOUT);
  };

  const mouseLeaveHandler = () => {
    clearTimeout(timeoutId.current);
    onChangeActiveMovie('');
  };

  useEffect(() => () => clearTimeout(timeoutId.current));

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div className="small-film-card__image">
        <img src={posterImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className="small-film-card__link">
          {name}
        </Link>
      </h3>
      {isActive && (
        <VideoPlayer
          src={previewVideoLink}
          poster={previewImage}
          muted
          onEnded={onChangeActiveMovie}
        />
      )}
    </article>
  );
}

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  posterImage: PropTypes.string.isRequired,
  previewVideoLink: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  previewImage: PropTypes.string.isRequired,
  onChangeActiveMovie: PropTypes.func.isRequired,
};

export { MovieCard };
