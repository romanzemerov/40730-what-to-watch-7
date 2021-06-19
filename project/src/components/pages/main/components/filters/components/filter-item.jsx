import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

function FilterItem({ label, isActive, onClick }) {
  const clickHandler = () => {
    if (isActive) {
      return;
    }

    onClick(label);
  };

  return (
    <li
      className={cn('catalog__genres-item', {
        'catalog__genres-item--active': isActive,
      })}
    >
      <a href className="catalog__genres-link" onClick={clickHandler}>
        {label}
      </a>
    </li>
  );
}

FilterItem.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { FilterItem };
