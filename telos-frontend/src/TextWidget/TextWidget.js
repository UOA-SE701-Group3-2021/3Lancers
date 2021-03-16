import Paper from '@material-ui/core/Paper';
// import InputBase from '@material-ui/core/InputBase';
import styles from './TextWidget.module.css';

/**
 * A text box widget that allows user input with multi-line support.
 * The widget fills the parent widget, so the widget is not responsible
 * for sizing.
 */
export default function TextWidget() {
  return (
    <Paper className={styles.paper} variant="outlined">
      {/* <InputBase multiline style={{ height: '50px' }} /> */}
      <textarea className={styles.textInput} />
    </Paper>
  );
}
