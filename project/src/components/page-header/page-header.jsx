import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';
import PropTypes from 'prop-types';

function PageHeader({ title, breadcrumbs }) {
  return (
    <header className="page-header user-page__head">
      {/*TODO: Вынести logo в отдельный компонент*/}

      <div className="logo">
        <Link to={AppRoutes.MAIN} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {/*TODO: Вынести breadcrumbs в отдельный компонент*/}

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

      {/*TODO: Вынести user-block в отдельный компонент*/}

      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img
              src="img/avatar.jpg"
              alt="User avatar"
              width={63}
              height={63}
            />
          </div>
        </li>
        <li className="user-block__item">
          <a href className="user-block__link">
            Sign out
          </a>
        </li>
      </ul>
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
