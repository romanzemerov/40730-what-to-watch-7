import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppRoutes, AuthorizationStates } from '../../const';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAuthState } from '../../store/auth/selectors';

function PrivateRoute({ render, path, exact, authState }) {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) =>
        authState === AuthorizationStates.AUTH ? (
          render(routeProps)
        ) : (
          <Redirect to={AppRoutes.SIGN_IN} />
        )}
    />
  );
}

const mapStateToProps = (state) => ({
  authState: getAuthState(state),
});

PrivateRoute.propTypes = {
  authState: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export { PrivateRoute };
export default connect(mapStateToProps)(PrivateRoute);
