import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import './index.sass'
import '@videojs/themes/dist/city/index.css';

const VideoComponent = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {options, onReady, className} = props;

  React.useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");
      
      // Add custom class names to the created video element, currently used for applying skin
      videoElement.classList.add('vjs-big-play-centered', 'video-js', 'vjs-theme-city', className);
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        // onReady && onReady(player);
        if (onReady) {
          onReady(player);
          var promise = player.play();
          if (promise !== undefined) {
            promise
              .then(function () {
                // Autoplay started!
                console.log("SUCCESS");
              })
              .catch(function (error) {
                // Autoplay was prevented.
                console.log("autoplay failed");
              });
          }
        }
      }));

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;

      // player.autoplay(options.autoplay);
      player.src(options.sources);
      var promise = player.play();

      if (promise !== undefined) {
        promise.then(function() {
          // Autoplay started!
          console.log('SUCCESS')
        }).catch(function(error) {
          // Autoplay was prevented.
          console.log('autoplay failed')
        });
      } 
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className='card'>
      <h3>video player</h3>
      <div data-vjs-player>
        <div ref={videoRef}/>
      </div>
      <div className='info'>
        <button onClick={() => playerRef.current.play()}>play</button>
        <button onClick={() => playerRef.current.pause()}>pause</button>
      </div>
    </div>
  );
}

export default VideoComponent;
