import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function VideoPlayer({ src, poster, autoPlay = true, muted = false, onEnded }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoNode = videoRef.current;
    videoNode.onended = () => onEnded('');

    return () => {
      videoNode.onended = null;
    };
  }, [onEnded]);

  return (
    <video
      ref={videoRef}
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '10',
        backgroundColor: '#000',
      }}
      src={src}
      poster={poster}
      muted={muted}
      autoPlay={autoPlay}
    />
  );
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  onEnded: PropTypes.func.isRequired,
  autoPlay: PropTypes.bool,
  muted: PropTypes.bool,
};

export { VideoPlayer };
