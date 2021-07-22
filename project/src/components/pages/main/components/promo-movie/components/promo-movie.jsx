import React from 'react';
import PageHeader from '../../../../../page-header/page-header';
import { AppRoutes, AuthStates, LoadingStatus } from '../../../../../../const';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getChangeFavoriteStatus,
  getPromoMovie,
} from '../../../../../../store/promoMovie/selectors';
import { getAuthState } from '../../../../../../store/auth/selectors';
import { changeFavorite } from '../../../../../../store/promoMovie/async-actions';

function PromoMovie() {
  const movie = useSelector(getPromoMovie);
  const authStatus = useSelector(getAuthState);
  const changeFavoriteStatus = useSelector(getChangeFavoriteStatus);
  const history = useHistory();
  const dispatch = useDispatch();

  const addListClickHandler = () => {
    if (authStatus !== AuthStates.AUTH) {
      history.push(AppRoutes.SIGN_IN);
      return;
    }

    dispatch(changeFavorite({ id: movie.id, status: Number(!movie.isFavorite) }));
  };

  const playButtonClickHandler = () => {
    history.push(`/player/${movie.id}`);
  };

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={movie.backgroundImage} alt={movie.name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <PageHeader />

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={movie.posterImage} alt={movie.name} width="218" height="327" />
          </div>

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
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button
                className="btn btn--list film-card__button"
                type="button"
                onClick={addListClickHandler}
                disabled={changeFavoriteStatus === LoadingStatus.LOADING}
              >
                <svg viewBox="0 0 19 20" width="19" height="20">
                  {movie.isFavorite && authStatus === AuthStates.AUTH ? (
                    <use xlinkHref="#in-list"></use>
                  ) : (
                    <use xlinkHref="#add"></use>
                  )}
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { PromoMovie };
