import React from 'react';
import PropTypes from 'prop-types';

const getRatingName = (rating) => {
  const RATING_DESCRIPTIONS = [
    { minRating: 0, name: 'Bad' },
    { minRating: 3, name: 'Normal' },
    { minRating: 5, name: 'Good' },
    { minRating: 8, name: 'Very good' },
    { minRating: 10, name: 'Awesome' },
  ];

  let result = null;

  for (const { minRating, name } of RATING_DESCRIPTIONS) {
    if (rating < minRating) {
      break;
    }

    result = name;
  }

  return result;
};

function MovieOverview({
  rating,
  description,
  director,
  starring,
  scoresCount,
}) {
  return (
    <div>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingName(rating)}</span>
          <span className="film-rating__count">
            {scoresCount}
            {scoresCount > 1 ? ' ratings' : ' rating'}
          </span>
        </p>
      </div>
      <div className="film-card__text">
        {description}
        <p className="film-card__director">
          <strong>Director: {director}</strong>
        </p>
        <p className="film-card__starring">
          <strong>Starring: {starring.map((star) => star).join(', ')}</strong>
        </p>
      </div>
    </div>
  );
}

MovieOverview.propTypes = {
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  scoresCount: PropTypes.number.isRequired,
};

export { MovieOverview };
