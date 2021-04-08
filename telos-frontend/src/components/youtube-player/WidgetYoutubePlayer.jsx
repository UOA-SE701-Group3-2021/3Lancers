import YouTubeIcon from '@material-ui/icons/YouTube';
import styles from '../Widget.module.css';

const WidgetYoutubePlayer = ({ addNewYoutubePlayer }) => (
  <div onClick={addNewYoutubePlayer} className={`${styles.widgetIcon} ${styles.vertical}`}>
    <YouTubeIcon style={{ fontSize: 40 }} />
  </div>
);

export default WidgetYoutubePlayer;
