// import Box from '@material-ui/core/Box';
// import { useState } from 'react';
// import styles from './TextWidget.module.css';
//
// const axios = require('axios');
//
// // This react component draws a Material-UI paper background and overlays a text area on it for the user to make notes
// const JournalText = () => {
//   // text widgeds content stored in react state
//   const [textContent, setTextContent] = useState('');
//   const [TextWidgetId, setTextWidgetId] = useState(undefined);
//   // const [selectedText, setSelectedText] = useState({});
//
//   const handleAdd = () => {
//     const body = {
//       text:textContent,
//       widgetId: TextWidgetId,
//     };
//
//     axios.post('http://localhost:3001/api/text', body).then((res) => {
//       const newText = res.data;
//       setTextContent(newText);
//       setTextWidgetId(newText.widgetId);
//     });
//   };
//
//
//
//   // const deleteEvent = () => {
//   //   axios.delete('http://localhost:3001/api/text/${textContent._id}').then((res) => {
//   //   });
//   // };
//
//
//
//   // function onTextChange(text) {
//   //   setTextContent(text);
//   // }
//
//   return (
//     <>
//       <Box className={styles.box}>
//         <textarea
//           data-testid="textInput"
//           className={styles.textInput}
//           value={textContent}
//           // onChange={(e) => onTextChange(e.target.value)}
//           onClick={() => {
//             handleAdd();
//           }}
//         />
//       </Box>
//     </>
//   );
// };
//
// export default JournalText;

import Box from '@material-ui/core/Box';
import { useState } from 'react';
import styles from './TextWidget.module.css';

const axios = require('axios');

// This react component draws a Material-UI paper background and overlays a text area on it for the user to make notes
const JournalText = () => {
  // text widgeds content stored in react state
  const [textContent, setTextContent] = useState('');
  // const [TextWidgetId, setTextWidgetId] = useState(undefined);

  const handleAdd = (event) => {
    const body = {
      text: textContent,
      // widgetId: TextWidgetId,
    };

    axios.post('http://localhost:3001/api/text', body).then((res) => {
      const newText = res.data;
      setTextContent(newText);
      // setTextWidgetId(newText.widgetId);
    });
    setTextContent(event.target.value);
  };

  // function onTextChange() {
  //     handleAdd();
  // }

  return (
    <Box className={styles.box}>
      <textarea
        data-testid="textInput"
        className={styles.textInput}
        value={textContent}
        onChange={handleAdd}
      />
    </Box>
  );
};

export default JournalText;
