import React from 'react';
import videojs from 'video.js'
import VideoComponent from './VideoComponent';

const App = () => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    // autoplay: 'play',
    // autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: '//vjs.zencdn.net/v/oceans.mp4',
      // src: '//src/assets/video/test.mp4',
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });

    player.on('ready', () => {
      videojs.log('ready from appjs');
    });
  };

  return (
    <div>
      <h2 onClick={() => {
        console.log('what: ', playerRef.current)
        playerRef.current.play()
      }}>main page</h2>
      <div className='wrapper'>
        <VideoComponent options={videoJsOptions} onReady={handlePlayerReady} className="test" />
        <VideoComponent options={videoJsOptions} onReady={handlePlayerReady} />
        <VideoComponent options={videoJsOptions} onReady={handlePlayerReady} />
        <VideoComponent options={videoJsOptions} onReady={handlePlayerReady} />
        <VideoComponent options={videoJsOptions} onReady={handlePlayerReady} />
        <VideoComponent options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
}

export default App