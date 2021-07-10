import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../../const';
import PropTypes from 'prop-types';
import { userPropTypes } from '../../../types/user.prop';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/auth/async-actions';

function UserBlock({ authStatus, user }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  if (pathname === AppRoutes.SIGN_IN) {
    return null;
  }

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <ul className="user-block">
      {authStatus === AuthorizationStatus.AUTH ? (
        <>
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src={user.avatarUrl} alt={user.name} width={63} height={63} />
            </div>
          </li>
          <li className="user-block__item">
            <Link to={AppRoutes.WATCH_LIST} className="user-block__link">
              My list
            </Link>
          </li>
          <li className="user-block__item">
            <Link to={AppRoutes.MAIN} className="user-block__link" onClick={logoutHandler}>
              Sign out
            </Link>
          </li>
        </>
      ) : (
        <li className="user-block__item">
          <Link to={AppRoutes.SIGN_IN} className="user-block__link">
            Login
          </Link>
        </li>
      )}
    </ul>
  );
}

UserBlock.propTypes = {
  authStatus: PropTypes.string.isRequired,
  user: userPropTypes,
};

export { UserBlock };
