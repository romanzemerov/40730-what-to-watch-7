import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

function Tab({ id, label, isActive, onClick }) {
  return (
    <li
      className={cn('film-nav__item', { 'film-nav__item--active': isActive })}
    >
      <a href className="film-nav__link" onClick={() => onClick(id)}>
        {label}
      </a>
    </li>
  );
}

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { Tab };
