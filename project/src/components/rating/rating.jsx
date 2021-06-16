import React, { useState } from 'react';
import PropTypes from 'prop-types';

const stars = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
].reverse();

function Rating({ value = 5, onChange }) {
  return (
    <div className="rating">
      <div className="rating__stars">
        {stars.map(({ id }) => {
          const name = `star-${id}`;
          const isChecked = value === id;

          return (
            <React.Fragment key={name}>
              <input
                className="rating__input"
                id={name}
                type="radio"
                name="rating"
                checked={isChecked}
                defaultValue={id}
                onChange={() => onChange(id)}
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
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export { Rating };
