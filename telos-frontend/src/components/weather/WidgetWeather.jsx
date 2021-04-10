import WbSunny from '@material-ui/icons/WbSunny'
import styles from '../Widget.module.css';

const WidgetWeather = ({ addNewWeather }) => (
  <div onClick={addNewWeather} className={`${styles.widgetIcon} ${styles.vertical}`}>
    <WbSunny style={{ fontSize: 40 }}/>
  </div>
);

export default WidgetWeather;