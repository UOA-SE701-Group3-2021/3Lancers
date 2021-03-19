/* eslint-disable no-unused-vars */
import {
  Checkbox,
  Divider,
  Box,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Menu,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Modal,
  makeStyles,
  MenuItem,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import purple from '@material-ui/core/colors/purple';
import AddIcon from '@material-ui/icons/Add';
import { createMuiTheme } from '@material-ui/core/styles';
import { useState } from 'react';
import './JournalHabitTracker.css';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: purple,
  },
});

const JournalHabitTracker = () => {
  const hobbyList = [
    {
      content: 'Habit 1',
      finished: true,
    },
    {
      content: 'Habit 2',
      finished: false,
    },
    {
      content: 'Habit 3',
      finished: false,
    },
  ];

  const [newhobbyList, setNewhobbyList] = useState(hobbyList);

  const addHobby = () => {
    newhobbyList.push({
      content: 'Habit 4',
      finished: false,
    });
  };

  const changeHobby = (e) => {
    newhobbyList.forEach((item, index) => {
      if (e === index) {
        // eslint-disable-next-line no-param-reassign
        item.finished = !item.finished;
        console.log(item);
      }
    })
  };

  const Remove = (index) => {
    newhobbyList.splice(index, 1);
  };

  return (
    <Box className="container">
      <div className="HabitualsTitle">
        <h2 align="middle">Habituals</h2>
        <span className="AddIcon">
          <IconButton
            className="AddBtn"
            variant="outlined"
            color="primary"
            onClick={(event) => {
              addHobby();
            }}
          >
            <AddIcon className="Publish" aria-controls="simple-modal" />
          </IconButton>
        </span>
      </div>
      <List component="nav" aria-label="main mailbox folders" style={{ padding: '0px' }}>
        {newhobbyList.map((item, index) => (
          <ListItem
            button
            theme={theme}
            onContextMenu={() => {
              Remove(index);
            }}
          >
            <Button onClick={() => changeHobby(index)}>
              {item.finished ? (
                <Avatar style={{ backgroundColor: '#7a00f4', border: ' 1px solid #7a00f4' }}>{`H${
                  index + 1
                }`}</Avatar>
              ) : (
                <Avatar
                  style={{
                    backgroundColor: '#fafafa',
                    border: ' 2px solid #7a00f4',
                    color: '#7a00f4',
                  }}
                >{`H${index + 1}`}</Avatar>
              )}
            </Button>
            <div>
              <ListItemText
                onClick={() => console.log(index)}
                primary={`${item.content}`}
                style={{ marginLeft: '10px' }}
              />
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default JournalHabitTracker;
