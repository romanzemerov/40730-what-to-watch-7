import React from 'react';
import { PageFooter } from '../../page-footer/page-footer';
import { PageHeader } from '../../page-header/page-header';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { moviePropTypes } from '../../../types/movie.prop';
import { MovieDescription } from '../../movie-description/movie-description';
import { MovieList } from '../../movie-list/movie-list';
import { movies } from '../../../mocks/movies';

function Movie({ movie, history, match }) {
  const { url } = match;

  const playButtonClickHandler = () => {
    history.push(`/player/${movie.id}`);
  };

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
                >
                  <svg viewBox="0 0 19 20" width={19} height={20}>
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`${url}/review`} className="btn film-card__button">
                  Add review
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={movie.posterImage}
                alt={movie.name}
                width={218}
                height={327}
              />
            </div>
            <MovieDescription movie={movie} />
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MovieList
            movies={movies
              .filter(({ genre }) => genre === movie.genre)
              .slice(0, 4)}
          />
        </section>
        <PageFooter />
      </div>
    </div>
  );
}

Movie.propTypes = {
  movie: moviePropTypes.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export { Movie };
