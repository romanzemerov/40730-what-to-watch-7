import React, { useEffect } from 'react';
import { PageFooter } from '../../page-footer/page-footer';
import { MovieList } from '../../movie-list/movie-list';
import PageHeader from '../../page-header/page-header';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoriteMovies, getFavoriteMoviesStatus } from '../../../store/movies/selectors';
import { loadingStates } from '../../../const';
import { fetchFavoriteMovies } from '../../../store/movies/async-actions';
import { LoadingScreen } from '../../loading-screen/loading-screen';

function WatchList() {
  const favoritesMovies = useSelector(getFavoriteMovies);
  const favoriteMoviesStatus = useSelector(getFavoriteMoviesStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteMovies());
  }, [dispatch]);

  if (favoriteMoviesStatus !== loadingStates.SUCCEEDED) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="user-page">
        <PageHeader title={'My list'} />

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <MovieList movies={favoritesMovies} />
        </section>

        <PageFooter />
      </div>
    </div>
  );
}

export { WatchList };
