import React, { useState } from 'react';
import PropTypes from 'prop-types';

const stars = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 },
  { id: 6, value: 6 },
  { id: 7, value: 7 },
  { id: 8, value: 8 },
  { id: 9, value: 9 },
  { id: 10, value: 10 },
].reverse();

function Rating({ defaultRating = 5 }) {
  const [activeId, setActiveId] = useState(defaultRating);

  return (
    <div className="rating">
      <div className="rating__stars">
        {stars.map(({ id, value }) => {
          const name = `star-${id}`;
          const isChecked = id === activeId;

          return (
            <React.Fragment key={name}>
              <input
                className="rating__input"
                id={name}
                type="radio"
                name="rating"
                checked={isChecked}
                defaultValue={value}
                onChange={() => setActiveId(id)}
              />
              <label className="rating__label" htmlFor={name}>
                Rating {id}
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

Rating.propTypes = {
  defaultRating: PropTypes.number,
};

export { Rating };
