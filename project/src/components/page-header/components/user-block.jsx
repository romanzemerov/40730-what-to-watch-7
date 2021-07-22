import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes, AuthStates } from '../../../const';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/auth/async-actions';
import { getAuthState, getUser } from '../../../store/auth/selectors';

function UserBlock() {
  const { pathname } = useLocation();
  const authState = useSelector(getAuthState);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  if (pathname === AppRoutes.SIGN_IN) {
    return null;
  }

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <ul className="user-block">
      {authState === AuthStates.AUTH ? (
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

export { UserBlock };
