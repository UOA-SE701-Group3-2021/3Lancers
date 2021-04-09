import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
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

// // function YoutubeWidget({ id, deleteWidget }) {
// //   const [vidID, setVidID] = useState('');
// //   const [displayFrame, setDisplayFrame] = useState(false);

// //   useEffect(() => {
// //     setVidID('DWcJFNfaw9c');
// //   });

// //   return (
// //     <div className={styles.ytWidget}>
// //       <div className={styles.header}>
// //         <FaTimes className={styles.cross} onClick={() => deleteWidget(id)} />
// //       </div>
// //       {displayFrame ? (
// //         <iframe
// //           id="ytplayer"
// //           title="youtube"
// //           type="text/html"
// //           width="720"
// //           height="405"
// //           src={`https://www.youtube.com/embed/${vidID}`}
// //           frameBorder="0"
// //           allowFullScreen
// //         />
// //       ) : (
// //         <button onClick={() => setDisplayFrame(true)} type="submit" className={styles.submitBtn}>
// //           Submit
// //         </button>
// //       )}
// //       <input
// //         className={styles.inputField}
// //         onChange={(e) => setVidID(YouTubeGetID(e.target.value))}
// //       />
// //     </div>
// //   );
// // }

function YoutubeWidget({ id, deleteWidget }) {
  const [vidID, setVidID] = useState('5qap5aO4i9A');

  return (
    <div className={styles.ytWidget}>
      <div className={styles.header}>
        <FaTimes className={styles.cross} onClick={() => deleteWidget(id)} />
      </div>
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
