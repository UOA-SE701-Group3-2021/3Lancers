import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './JournalYoutubePlayer.module.css';

function YoutubeWidget({ id, deleteWidget }) {
  const [vidID, setVidID] = useState('0');
  const [displayFrame, setDisplayFrame] = useState(false);

  return (
    <div className={styles.ytWidget}>
      <div className={styles.header}>
        <FaTimes className={styles.cross} onClick={() => deleteWidget(id)} />
      </div>
      {displayFrame ? (
        <iframe
          id="ytplayer"
          title="youtube"
          type="text/html"
          width="720"
          height="405"
          src={`https://www.youtube.com/embed/${vidID}`}
          frameBorder="0"
          allowFullScreen
        />
      ) : (
        <button onClick={() => setDisplayFrame(true)} type="submit" className={styles.submitBtn}>
          Submit
        </button>
      )}
      <input className={styles.inputField} onChange={(e) => setVidID(e.target.value)} />
    </div>
  );
}

export default YoutubeWidget;
