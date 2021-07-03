import React from 'react';
import { Tabs } from '../tabs/tabs';
import { Tab } from '../tabs/components/tab/tab';
import { MovieOverview } from './components/movie-overview/movie-overview';
import { MovieDetails } from './components/movie-details/movie-details';
import { MovieReviews } from './components/movie-reviews/movie-reviews';
import { moviePropTypes } from '../../types/movie.prop';

function MovieDescription({ movie }) {
  const { rating, description, director, starring, scoresCount, runTime, genre, released } = movie;

  return (
    <div className="film-card__desc">
      <Tabs>
        <Tab label={'Overview'}>
          <MovieOverview
            rating={rating}
            description={description}
            director={director}
            starring={starring}
            scoresCount={scoresCount}
          />
        </Tab>
        <Tab label={'Details'}>
          <MovieDetails
            director={director}
            starring={starring}
            runTime={runTime}
            genre={genre}
            released={released}
          />
        </Tab>
        <Tab label={'Reviews'}>
          <MovieReviews />
        </Tab>
      </Tabs>
    </div>
  );
}

MovieDescription.propTypes = {
  movie: moviePropTypes.isRequired,
};

export { MovieDescription };
