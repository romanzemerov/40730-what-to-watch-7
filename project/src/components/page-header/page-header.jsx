import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import PropTypes from 'prop-types';
import { UserBlock } from './components/user-block';

function PageHeader({ title, breadcrumbs }) {
  return (
    <header className="page-header user-page__head">
      <div className="logo">
        <Link to={AppRoutes.MAIN} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {breadcrumbs && (
        <nav className="breadcrumbs">
          <ul className="breadcrumbs__list">
            {breadcrumbs.map(({ label, href }) => {
              const link = href ? (
                <Link to={href} className="breadcrumbs__link">
                  {label}
                </Link>
              ) : (
                <a href className="breadcrumbs__link">
                  {label}
                </a>
              );

              return (
                <li key={label} className="breadcrumbs__item">
                  {link}
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {title && <h1 className="page-title user-page__title">{title}</h1>}

      <UserBlock />
    </header>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    }),
  ),
};

export { PageHeader };
