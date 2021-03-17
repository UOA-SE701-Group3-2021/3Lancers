import Paper from '@material-ui/core/Paper';
import styles from './TextWidget.module.css';

// This react component draws a Material-UI paper background and overlays a text area on it for the user to make notes
const JournalText = () => (
  <Paper className={styles.paper} variant="outlined">
    <textarea className={styles.textInput} />
  </Paper>
);

export default JournalText;
