import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { VideoPlayer } from '../video-player/video-player';

function MovieCard({
  id,
  name,
  posterImage,
  previewImage,
  previewVideoLink,
  isActive,
  videoEndedHandler,
}) {
  return (
    <article className="small-film-card catalog__films-card" data-id={id}>
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
          onEnded={videoEndedHandler}
        />
      )}
    </article>
  );
}

MovieCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  posterImage: PropTypes.string.isRequired,
  previewVideoLink: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  previewImage: PropTypes.string.isRequired,
  videoEndedHandler: PropTypes.func.isRequired,
};

export { MovieCard };
