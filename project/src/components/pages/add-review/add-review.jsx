import React from 'react';
import { CommentForm } from '../../comment-form/comment-form';
import { PageHeader } from '../../page-header/page-header';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentMovie, getCurrentMovieStatus } from '../../../store/movies/selectors';
import { LoadingScreen } from '../../loading-screen/loading-screen';
import { fetchMovie } from '../../../store/movies/async-actions';
import { useParams } from 'react-router-dom';
import { LoadingStatus } from '../../../const';
import { isLoadingFinish } from '../../../helpers';

function AddReview() {
  const { id } = useParams();
  const movieStatus = useSelector(getCurrentMovieStatus);
  const movie = useSelector(getCurrentMovie);
  const dispatch = useDispatch();

  if (movieStatus === LoadingStatus.IDLE) {
    dispatch(fetchMovie(id));

    return <LoadingScreen />;
  }

  if (!isLoadingFinish(movieStatus)) {
    return <LoadingScreen />;
  }

  // TODO: автоматически генерировать хлебные крошки.
  const breadCrumbs = [{ label: movie.name, href: `/films/${movie.id}` }, { label: 'Add Review' }];

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={movie.backgroundImage} alt={movie.name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <PageHeader breadcrumbs={breadCrumbs} />
          <div className="film-card__poster film-card__poster--small">
            <img src={movie.posterImage} alt={movie.name} width={218} height={327} />
          </div>
        </div>
        <div className="add-review">
          <CommentForm movieId={id} />
        </div>
      </section>
    </div>
  );
}

export { AddReview };
