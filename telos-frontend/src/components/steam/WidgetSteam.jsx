import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import styles from '../Widget.module.css';

const WidgetSteam = ({ addNewSteam }) => (
  <div onClick={addNewSteam} className={`${styles.widgetIcon} ${styles.vertical}`}>
    <SportsEsportsIcon style={{ fontSize: 40 }} />
  </div>
);

export default WidgetSteam;
