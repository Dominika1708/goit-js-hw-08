import Vimeo from '@vimeo/player';
import { throttle } from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

player.on(
  'timeupdate',
  throttle(({ duration, percent, seconds }) => {
    localStorage.setItem('videoplayer-current-time', `${seconds}`);
  }, 1000)
);

const playedTime = localStorage.getItem('videoplayer-current-time');

player
  .setCurrentTime(playedTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
