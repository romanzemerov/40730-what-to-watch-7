import React, { useEffect } from 'react';
import { PageFooter } from '../../page-footer/page-footer';
import PageHeader from '../../page-header/page-header';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { MovieDescription } from '../../movie-description/movie-description';
import { MovieList } from '../../movie-list/movie-list';
import { LoadingScreen } from '../../loading-screen/loading-screen';
import { useDispatch, useSelector } from 'react-redux';
import { changeFavorite, fetchMovie, fetchSimilarFilms } from '../../../store/movies/async-actions';
import {
  getChangeFavoriteStatus,
  getCurrentMovie,
  getCurrentMovieStatus,
  getSimilarMovies,
  getSimilarMoviesStatus
} from '../../../store/movies/selectors';
import { AppRoutes, AuthorizationStates, loadingStates } from '../../../const';
import { getAuthState } from '../../../store/auth/selectors';
import { fetchComments } from '../../../store/comments/async-actions';

function Movie() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  const movie = useSelector(getCurrentMovie);
  const movieStatus = useSelector(getCurrentMovieStatus);
  const similarMovies = useSelector(getSimilarMovies);
  const similarMoviesStatus = useSelector(getSimilarMoviesStatus);
  const changeFavoriteStatus = useSelector(getChangeFavoriteStatus);
  const authStatus = useSelector(getAuthState);
  const dispatch = useDispatch();

  const playButtonClickHandler = () => {
    history.push(`/player/${id}`);
  };

  const addListClickHandler = () => {
    if (authStatus !== AuthorizationStates.AUTH) {
      history.push(AppRoutes.SIGN_IN);
      return;
    }

    dispatch(changeFavorite({ id: movie.id, status: Number(!movie.isFavorite) }));
  };

  useEffect(() => {
    dispatch(fetchMovie(id));
    dispatch(fetchSimilarFilms(id));
    dispatch(fetchComments(id));
  }, [id, dispatch]);

  if (movieStatus !== loadingStates.SUCCEEDED) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={movie.backgroundImage} alt={movie.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>

          <PageHeader />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{movie.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{movie.genre}</span>
                <span className="film-card__year">{movie.released}</span>
              </p>
              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                  onClick={playButtonClickHandler}
                >
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                  onClick={addListClickHandler}
                  disabled={changeFavoriteStatus === loadingStates.LOADING}
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    {movie.isFavorite ? (
                      <use xlinkHref="#in-list"></use>
                    ) : (
                      <use xlinkHref="#add"></use>
                    )}
                  </svg>
                  <span>My list</span>
                </button>
                {authStatus === AuthorizationStatus.AUTH && (
                  <Link to={`${pathname}/review`} className="btn film-card__button">
                    Add review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={movie.posterImage} alt={movie.name} width={218} height={327} />
            </div>
            <MovieDescription movie={movie} />
          </div>
        </div>
      </section>
      <div className="page-content">
        {similarMoviesStatus === loadingStates.SUCCEEDED ? (
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <MovieList movies={similarMovies} />
          </section>
        ) : null}

        <PageFooter />
      </div>
    </div>
  );
}

export { Movie };
