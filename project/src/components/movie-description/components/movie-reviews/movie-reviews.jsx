import React from 'react';
import { sliceIntoChunks } from '../../../../helpers';
import { Review } from './components/review/review';
import { useSelector } from 'react-redux';
import { getComments } from '../../../../store/comments/selectors';

function MovieReviews() {
  const reviews = useSelector(getComments);
  const chunkedReviews = sliceIntoChunks(reviews, 3);

  return (
    <div className="film-card__reviews film-card__row">
      {chunkedReviews &&
        chunkedReviews.map((chunk) => (
          <div key={chunk.map(({ id }) => id).join('')} className="film-card__reviews-col">
            {chunk.map((review) => (
              <Review key={review.id} {...review} />
            ))}
          </div>
        ))}
    </div>
  );
}

export { MovieReviews };
