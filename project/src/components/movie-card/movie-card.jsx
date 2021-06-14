import React from 'react';
import PropTypes from 'prop-types';

function MovieCard({ name, posterImage }) {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={posterImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">
          {name}
        </a>
      </h3>
    </article>
  );
}

MovieCard.propTypes = {
  name: PropTypes.string.isRequired,
  posterImage: PropTypes.string.isRequired,
};

export { MovieCard };
