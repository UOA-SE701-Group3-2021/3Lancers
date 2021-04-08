import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './JournalYoutubePlayer.module.css';

function YoutubeWidget({ id, deleteWidget }) {
  const [vidID, setVidID] = useState('0');
  const [displayFrame, setDisplayFrame] = useState(false);

  return (
    <div className="App" style={{ display: 'block' }}>
      <div className={styles.header}>
        <FaTimes className={styles.cross} onClick={() => deleteWidget(id)} />
      </div>
      <input defaultValue="" onChange={(e) => setVidID(e.target.value)} />
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
        <button onClick={() => setDisplayFrame(true)} type="submit">
          Submit
        </button>
      )}
    </div>
  );
}

export default YoutubeWidget;
