import React, { useState } from 'react';
import { Rating } from '../rating/rating';

const DEFAULT_RATING_VALUE = 0;
const MIN_COMMENT_LENGTH = 50;

function CommentForm() {
  const [rating, setRating] = useState(DEFAULT_RATING_VALUE);
  const [comment, setComment] = useState('');

  const formSubmitHandler = (e) => {
    e.preventDefault();
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
            disabled={comment.length < MIN_COMMENT_LENGTH}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}

export { CommentForm };
