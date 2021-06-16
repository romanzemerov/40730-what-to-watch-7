import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const';

function PageFooter() {
  return (
    <footer className="page-footer">
      <div className="logo">
        <Link to={AppRoutes.MAIN} className="logo__link logo__link--light">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="copyright">
        <p>© 2021 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export { PageFooter };
