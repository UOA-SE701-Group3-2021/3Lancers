import styles from '../Widget.module.css';

const WidgetText = ({ addNewText }) => (
  <div onClick={addNewText} className={`${styles.widgetIcon} ${styles.vertical}`}>
    <div className={styles.bigText}>T</div>
  </div>
);

export default WidgetText;
