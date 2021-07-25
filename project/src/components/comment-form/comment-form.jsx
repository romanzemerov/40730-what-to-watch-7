import React, { useState } from 'react';
import { Rating } from '../rating/rating';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingStatus } from '../../const';
import { getPostCommentStatus } from '../../store/comments/selectors';
import { postComments } from '../../store/comments/async-actions';
import PropTypes from 'prop-types';

const DEFAULT_RATING_VALUE = 0;
const MIN_COMMENT_LENGTH = 50;

function CommentForm({ movieId }) {
  const [rating, setRating] = useState(DEFAULT_RATING_VALUE);
  const [comment, setComment] = useState('');
  const postCommentStatus = useSelector(getPostCommentStatus);
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(postComments(movieId, { rating, comment }));
    setComment('');
    setRating(DEFAULT_RATING_VALUE);
  };

  const changeRatingHandler = (value) => {
    setRating(value);
  };

  const changeCommentHandler = (e) => {
    setComment(e.target.value);
  };

  return (
    <form className="add-review__form" onSubmit={formSubmitHandler}>
      <Rating value={rating} onChange={changeRatingHandler} />

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="comment"
          id="comment"
          placeholder="Review text"
          value={comment}
          onChange={changeCommentHandler}
        />
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={
              comment.length < MIN_COMMENT_LENGTH ||
              postCommentStatus === LoadingStatus.LOADING ||
              rating === DEFAULT_RATING_VALUE
            }
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export { CommentForm };
