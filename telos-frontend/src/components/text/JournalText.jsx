import Box from '@material-ui/core/Box';
import { useState } from 'react';
import styles from './TextWidget.module.css';

// This react component draws a Material-UI paper background and overlays a text area on it for the user to make notes
const JournalText = () => {
  // text widgeds content stored in react state
  const [textContent, setTextContent] = useState('');

  function onTextChange(text) {
    setTextContent(text);
  }

  return (
    <>
      <Box className={styles.box}>
        <textarea
          data-testid="textInput"
          className={styles.textInput}
          value={textContent}
          onChange={(e) => onTextChange(e.target.value)}
        />
      </Box>
    </>
  );
};

export default JournalText;
