import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../const';
import { PageFooter } from '../../page-footer/page-footer';
import { PageHeader } from '../../page-header/page-header';

function NotFound() {
  return (
    <div className="user-page">
      <PageHeader />

      <div className="sign-in user-page__content">
        <h1
          className="page-title user-page__title"
          style={{ position: 'static', marginBottom: '48px' }}
        >
          Page not found!
        </h1>

        <Link
          to={AppRoutes.MAIN}
          className="catalog__button"
          style={{ textDecoration: 'none' }}
          type="button"
        >
          To main page
        </Link>
      </div>

      <PageFooter />
    </div>
  );
}

export { NotFound };
