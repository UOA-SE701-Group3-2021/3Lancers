import Paper from '@material-ui/core/Paper';
import { useState } from 'react';
import styles from './TextWidget.module.css';

// This react component draws a Material-UI paper background and overlays a text area on it for the user to make notes
const JournalText = () => {
  
  // text widgeds content stored in react state
  const [textContent, setTextContent] = useState('')

  function onTextChange(text) {
    setTextContent(text);
  }


  return (
  <Paper className={styles.paper} variant="outlined">
    <textarea className={styles.textInput} value={textContent} onChange={e => onTextChange(e.target.value)} />
  </Paper>
  );
  }

export default JournalText;