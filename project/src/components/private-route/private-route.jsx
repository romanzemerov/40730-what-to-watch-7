import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../const';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function PrivateRoute({ render, path, exact, authorizationStatus }) {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) =>
        authorizationStatus === AuthorizationStatus.AUTH ? (
          render(routeProps)
        ) : (
          <Redirect to={AppRoutes.SIGN_IN} />
        )}
    />
  );
}

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export { PrivateRoute };
export default connect(mapStateToProps)(PrivateRoute);
