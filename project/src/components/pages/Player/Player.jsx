import React from 'react';
import { useHistory } from 'react-router-dom';
import { moviePropTypes } from '../../../types/movie.prop';

const formatTime = (minutes) => {
  const date = new Date(minutes * 60 * 1000);

  return date.toISOString().substr(11, 8);
};

function Player({ movie }) {
  const history = useHistory();

  const exitButtonHandler = () => {
    history.goBack();
  };

  return (
    <div>
      <div className="player">
        <video
          src={movie.videoLink}
          className="player__video"
          poster={movie.backgroundImage}
        />
        <button
          type="button"
          className="player__exit"
          onClick={exitButtonHandler}
        >
          Exit
        </button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={30} max={100} />
              <div className="player__toggler" style={{ left: '30%' }}>
                Toggler
              </div>
            </div>
            <div className="player__time-value">
              {formatTime(movie.runTime)}
            </div>
          </div>
          <div className="player__controls-row">
            <button type="button" className="player__play">
              <svg viewBox="0 0 19 19" width={19} height={19}>
                <use xlinkHref="#play-s" />
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">{movie.name}</div>
            <button type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width={27} height={27}>
                <use xlinkHref="#full-screen" />
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Player.propTypes = {
  movie: moviePropTypes.isRequired,
};

export { Player };
