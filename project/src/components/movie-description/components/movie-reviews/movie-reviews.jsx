import React from 'react';
import { sliceIntoChunks } from '../../../../helpers';
import { Review } from './components/review/review';
import PropTypes from 'prop-types';

function MovieReviews({ reviews }) {
  const chunkedReviews = sliceIntoChunks(reviews, 3);

  return (
    <div className="film-card__reviews film-card__row">
      {chunkedReviews.map((chunk) => (
        <div
          key={chunk.map(({ id }) => id).join('')}
          className="film-card__reviews-col"
        >
          {chunk.map((review) => (
            <Review key={review.id} {...review} />
          ))}
        </div>
      ))}
    </div>
  );
}

MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ),
};

export { MovieReviews };
