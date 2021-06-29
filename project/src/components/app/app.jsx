import React from 'react';
import Main from '../pages/main/main';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppRoutes, LOADING_STATES } from '../../const';
import { SignIn } from '../pages/sign-in/sign-in';
import { WatchList } from '../pages/watch-list/watch-list';
import { Movie } from '../pages/movie/movie';
import { AddReview } from '../pages/add-review/add-review';
import { Player } from '../pages/player/player';
import { NotFound } from '../pages/not-found/not-found';
import { moviePropTypes } from '../../types/movie.prop';
import { SvgSprite } from '../svg-sprite/svg-sprite';
import { RouteWithCurrentMovie } from '../route-with-current-movie/route-with-current-movie';
import { LoadingScreen } from '../loading-screen/loading-screen';
import { connect } from 'react-redux';
import PrivateRoute from '../private-route/private-route';

function App({ movies, moviesStatus }) {
  if (moviesStatus === LOADING_STATES.LOADING) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SvgSprite />
      <Router>
        <Switch>
          <Route path={AppRoutes.MAIN} exact>
            <Main movies={movies} />
          </Route>
          <Route path={AppRoutes.SIGN_IN}>
            <SignIn />
          </Route>
          <PrivateRoute
            path={AppRoutes.WATCH_LIST}
            exact={false}
            render={() => <WatchList movies={movies} />}
          />
          <RouteWithCurrentMovie path={AppRoutes.MOVIE} movies={movies} component={Movie} exact />
          <RouteWithCurrentMovie
            path={AppRoutes.ADD_REVIEW}
            movies={movies}
            component={AddReview}
            exact
          />
          <RouteWithCurrentMovie path={AppRoutes.PLAYER} movies={movies} component={Player} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

const mapStateToProps = (state) => ({
  movies: state.movies,
  moviesStatus: state.moviesStatus,
});

App.propTypes = {
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
  moviesStatus: PropTypes.string.isRequired,
};

export { App };
export default connect(mapStateToProps)(App);
