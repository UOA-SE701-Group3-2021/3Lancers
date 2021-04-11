import { useState } from 'react';
import styles from './JournalYoutubePlayer.module.css';

function YouTubeGetID(urlParam) {
  let ID = '';
  let url = urlParam;
  url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\\-]/i);
    [ID] = ID;
  } else {
    ID = url;
  }
  return ID;
}

function YoutubeWidget() {
  const [vidID, setVidID] = useState('5qap5aO4i9A');

  return (
    <div className={styles.ytWidget}>
      <iframe
        id="ytplayer"
        title="youtube"
        type="text/html"
        width="auto"
        height="auto"
        src={`https://www.youtube.com/embed/${vidID}`}
        frameBorder="0"
        allowFullScreen
      />
      <input
        className={styles.inputField}
        onChange={(e) => setVidID(YouTubeGetID(e.target.value))}
      />
    </div>
  );
}

export default YoutubeWidget;
