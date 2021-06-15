import React from 'react';
import { Main } from '../pages/Main/Main';
import PropTypes from 'prop-types';
import * as types from '../../types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppRoutes } from '../../const';
import { SignIn } from '../pages/SignIn/SignIn';
import { WatchList } from '../pages/WatchList/WatchList';
import { Movie } from '../pages/Movie/Movie';
import { AddReview } from '../pages/AddReview/AddReview';
import { Player } from '../pages/Player/Player';
import { NotFound } from '../pages/NotFound/NotFound';

function App({ movies }) {
  return (
    <Router>
      <Switch>
        <Route path={AppRoutes.MAIN} exact>
          <Main movies={movies} />
        </Route>
        <Route path={AppRoutes.SIGN_IN}>
          <SignIn />
        </Route>
        <Route path={AppRoutes.WATCH_LIST}>
          <WatchList />
        </Route>
        <Route path={AppRoutes.MOVIE} exact>
          <Movie />
        </Route>
        <Route path={AppRoutes.ADD_REVIEW} exact>
          <AddReview />
        </Route>
        <Route path={AppRoutes.PLAYER}>
          <Player />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

App.propTypes = {
  movies: PropTypes.arrayOf(types.movie).isRequired,
};

export { App };
