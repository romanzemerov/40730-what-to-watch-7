import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MovieCard({ id, name, posterImage }) {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={posterImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className="small-film-card__link">
          {name}
        </Link>
      </h3>
    </article>
  );
}

MovieCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  posterImage: PropTypes.string.isRequired,
};

export { MovieCard };
