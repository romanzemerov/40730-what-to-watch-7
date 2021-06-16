import React, { useState } from 'react';
import { Rating } from '../rating/rating';

function CommentForm() {
  const [review, setReview] = useState(null);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    setReview(Object.fromEntries(formData));
  };

  return (
    <form action="#" className="add-review__form" onSubmit={formSubmitHandler}>
      <Rating />

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="comment"
          id="comment"
          placeholder="Review text"
          defaultValue={''}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">
            Post
          </button>
        </div>
      </div>
      {/*временно, чтобы не ругался линтер*/}
      {JSON.stringify(review)}
    </form>
  );
}

export { CommentForm };
