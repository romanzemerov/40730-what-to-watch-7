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
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
};

export { Tab };
