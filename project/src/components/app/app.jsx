import React from 'react';
import Main from '../pages/main/main';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { AppRoutes } from '../../const';
import SignIn from '../pages/sign-in/sign-in';
import { WatchList } from '../pages/watch-list/watch-list';
import { Movie } from '../pages/movie/movie';
import { AddReview } from '../pages/add-review/add-review';
import { Player } from '../pages/player/player';
import { NotFound } from '../pages/not-found/not-found';
import { moviePropTypes } from '../../types/movie.prop';
import { SvgSprite } from '../svg-sprite/svg-sprite';
import { LoadingScreen } from '../loading-screen/loading-screen';
import { connect } from 'react-redux';
import PrivateRoute from '../private-route/private-route';
import { getMovies, getMoviesStatus } from '../../store/movies/selectors';
import { getAuthStatus } from '../../store/auth/selectors';
import { getPromoMovieStatus } from '../../store/promoMovie/selectors';
import { isLoadingFinish } from '../../helpers';

function App({ movies, moviesStatus, authStatus, promoMovieStatus }) {
  if (
    !isLoadingFinish(authStatus) &&
    !isLoadingFinish(moviesStatus) &&
    !isLoadingFinish(promoMovieStatus)
  ) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SvgSprite />

      <Switch>
        <Route path={AppRoutes.MAIN} exact>
          <Main movies={movies} />
        </Route>
        <Route path={AppRoutes.SIGN_IN}>
          <SignIn />
        </Route>
        <PrivateRoute path={AppRoutes.WATCH_LIST} render={() => <WatchList />} exact={false} />
        <Route path={AppRoutes.MOVIE} exact>
          <Movie />
        </Route>
        <Route path={AppRoutes.ADD_REVIEW} movies={movies} component={AddReview} exact>
          <AddReview />
        </Route>
        <Route path={AppRoutes.PLAYER}>
          <Player />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  moviesStatus: getMoviesStatus(state),
  authStatus: getAuthStatus(state),
  promoMovieStatus: getPromoMovieStatus(state),
});

App.propTypes = {
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
  moviesStatus: PropTypes.string.isRequired,
  authStatus: PropTypes.string.isRequired,
  promoMovieStatus: PropTypes.string.isRequired,
};

export { App };
export default connect(mapStateToProps)(App);
