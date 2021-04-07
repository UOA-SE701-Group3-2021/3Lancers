import MusicNoteIcon from '@material-ui/icons/MusicNote';
import styles from '../Widget.module.css';
import './WidgetSpotifyPlayer.module.css';

const WidgetSpotifyPlayer = ({ addNewSpotifyPlayer }) => (
  <div onClick={addNewSpotifyPlayer} className={`${styles.widgetIcon} ${styles.vertical}`}>
    <MusicNoteIcon style={{ fontSize: 35 }} />
  </div>
);

export default WidgetSpotifyPlayer;
