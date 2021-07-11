import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentMovie, getCurrentMovieStatus } from '../../../store/movies/selectors';
import { fetchMovie } from '../../../store/movies/async-actions';
import { loadingStates } from '../../../const';
import { LoadingScreen } from '../../loading-screen/loading-screen';
import { ticker } from '../../../utils';

const formatTime = (minutes) => {
  const date = new Date(minutes * 1000);

  return date.toISOString().substr(11, 8);
};

function Player() {
  const movie = useSelector(getCurrentMovie);
  const movieStatus = useSelector(getCurrentMovieStatus);
  const [isPlaying, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const history = useHistory();
  const { id } = useParams();
  const videoRef = useRef();
  const dispatch = useDispatch();

  const exitButtonHandler = () => {
    history.goBack();
  };

  const handleFullScreenClick = () => {
    videoRef.current.requestFullscreen();
  };

  const playToggleHandler = () => {
    if (!isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }

    setPlaying((prev) => !prev);
  };

  const tickHandler = () => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      setProgress((videoRef.current.currentTime * 100) / videoRef.current.duration);
    }
  };

  const handleProgressClick = (evt) => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      const progressWidth = evt.target.offsetWidth;
      const togglerWidth = evt.target.parentElement.querySelector('.player__toggler').offsetWidth;
      const posX = evt.clientX - togglerWidth - togglerWidth / 2;
      const progressPosition = (posX * 100) / progressWidth;

      setProgress(progressPosition);
      videoRef.current.currentTime = (progressPosition * videoRef.current.duration) / 100;
    }
  };

  useEffect(() => {
    dispatch(fetchMovie(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState === 4) {
      setTime(videoRef.current.duration);
    }
  }, [videoRef.current]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const clearTicker = ticker(tickHandler);

    return () => {
      clearTicker();
    };
  }, [isPlaying]);

  if (movieStatus !== loadingStates.SUCCEEDED) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="player">
        <video
          src={movie.videoLink}
          className="player__video"
          poster={movie.backgroundImage}
          autoPlay={isPlaying}
          ref={videoRef}
        />
        <button type="button" className="player__exit" onClick={exitButtonHandler}>
          Exit
        </button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress
                className="player__progress"
                value={progress}
                max={100}
                onClick={handleProgressClick}
              />
              <div className="player__toggler" style={{ left: `${progress}%` }}>
                Toggler
              </div>
            </div>
            <div className="player__time-value">
              {time && formatTime(time - (videoRef.current?.currentTime ?? 0))}
            </div>
          </div>
          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={playToggleHandler}>
              {isPlaying ? (
                <>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"></use>
                  </svg>
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 19 19" width={19} height={19}>
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </>
              )}
            </button>

            <div className="player__name">{movie.name}</div>
            <button type="button" className="player__full-screen" onClick={handleFullScreenClick}>
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

export { Player };
