import React from 'react';
import { CommentForm } from '../../comment-form/comment-form';
import { moviePropTypes } from '../../../types/movie.prop';
import { PageHeader } from '../../page-header/page-header';

function AddReview({ movie }) {
  // TODO: автоматически генерировать хлебные крошки.

  const breadCrumbs = [
    { label: movie.name, href: `films/${movie.id}` },
    { label: 'Add Review' },
  ];

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
            <img
              src={movie.posterImage}
              alt={movie.name}
              width={218}
              height={327}
            />
          </div>
        </div>
        <div className="add-review">
          <CommentForm />
        </div>
      </section>
    </div>
  );
}

AddReview.propTypes = {
  movie: moviePropTypes.isRequired,
};

export { AddReview };
