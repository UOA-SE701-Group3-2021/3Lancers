import styles from '../Widget.module.css';

const WidgetSpotifyPlayer = ({ addNewSpotifyPlayer }) => (
  <div onClick={addNewSpotifyPlayer} className={`${styles.widgetIcon} ${styles.vertical}`}>
    <div className={styles.bigText}>S</div>
  </div>
);

export default WidgetSpotifyPlayer;
