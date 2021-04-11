import styles from '../Widget.module.css';

const WidgetClock = ({ addNewClock }) => (
  <div onClick={addNewClock} className={`${styles.widgetIcon} ${styles.vertical}`}>
    <div className={styles.bigText}>C</div>
  </div>
);

export default WidgetClock;
