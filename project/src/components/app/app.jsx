import React from 'react';
import Main from '../pages/main/main';
import PropTypes from 'prop-types';
import { Router, Switch, Route } from 'react-router-dom';
import { AppRoutes, loadingStates } from '../../const';
import SignIn from '../pages/sign-in/sign-in';
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
import { getMovies, getMoviesStatus } from '../../store/movies/selectors';
import browserHistory from '../../browser-history';
import { getPromoMovieStatus } from '../../store/promoMovie/selectors';

function App({ movies, moviesStatus, authStatus, promoMovieStatus }) {
  if (
    moviesStatus !== loadingStates.SUCCEEDED &&
    authStatus !== loadingStates.SUCCEEDED &&
    promoMovieStatus !== loadingStates.SUCCEEDED
  ) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SvgSprite />
      <Router history={browserHistory}>
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
          <Route path={AppRoutes.MOVIE} exact>
            <Movie />
          </Route>
          <Route path={AppRoutes.ADD_REVIEW} movies={movies} component={AddReview} exact>
            <AddReview />
          </Route>
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
  movies: getMovies(state),
  moviesStatus: getMoviesStatus(state),
  promoMovieStatus: getPromoMovieStatus(state),
});

App.propTypes = {
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
  moviesStatus: PropTypes.string.isRequired,
  promoMovieStatus: PropTypes.string.isRequired,
};

export { App };
export default connect(mapStateToProps)(App);
