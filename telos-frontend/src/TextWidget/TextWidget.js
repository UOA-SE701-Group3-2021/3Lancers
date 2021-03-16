import styles from './TextWidget.module.css';

/**
 * A text box widget that allows user input with multi-line support.
 * The widget fills the parent widget, so the widget is not responsible
 * for sizing.
 */
export default function TextWidget() {
  return <textarea className={styles.textBox} />;
}
