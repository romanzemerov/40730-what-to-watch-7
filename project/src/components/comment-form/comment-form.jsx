import React, { useState } from 'react';
import { Rating } from '../rating/rating';

const defaultRatingValue = 5;
const minCommentLength = 50;

function CommentForm() {
  const [rating, setRating] = useState(defaultRatingValue);
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
            disabled={comment.length < minCommentLength}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}

export { CommentForm };
