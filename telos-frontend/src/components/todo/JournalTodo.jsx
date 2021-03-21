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
  TextField,
  Select,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ErrorIcon from '@material-ui/icons/Error';
import journalStyles from './JournalTodo.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    color: 'rgba(0, 0, 0, 0.6)',
    backgroundColor: theme.palette.background.paper,
  },
}));

const listitems = [
  {
    name: 'OnGoing',
    onGoing: true,
  },
  //   {
  //     name: 'OutDated',
  //     onGoing: false,
  //   },
];

const outdated = {
  color: '#FF0000',
};

const options = ['Cancel', 'Reschedule'];

const JournalTodo = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState([0]);
  const [item, setItem] = useState('');
  const [newItem, setNewItem] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const firstEvent = (event) => {
    setItem(event.target.value);
  };

  const secondEvent = () => {
    setNewItem((prev) => [...prev, item]);
    setItem('');
  };

  return (
    <Box className={journalStyles.container}>
      <div>
        <p className={journalStyles.title}> To Do </p>
      </div>
      <Divider />
      <List className={classes.root}>
        {newItem.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              className={journalStyles.listItem}
              key={value}
              role={undefined}
              dense
              button
              onClick={handleToggle(value)}
            >
              {value.onGoing ? (
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    style={{ color: '#FF0000' }}
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
              ) : (
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    style={{ color: '#6200EE' }}
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
              )}
              {value.onGoing ? (
                <ListItemText
                  primaryTypographyProps={{ style: outdated }}
                  id={labelId}
                  primary={` ${value}`}
                />
              ) : (
                <ListItemText id={labelId} primary={` ${value}`} />
              )}
              {value.onGoing ? (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <ErrorIcon style={{ color: '#EB5757' }} />
                  </IconButton>
                </ListItemSecondaryAction>
              ) : (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          );
        })}
      </List>
      <div>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">New To Do</InputLabel>
          <OutlinedInput
            id="outlined-todo"
            value={item}
            onChange={firstEvent}
            endAdornment={
              <InputAdornment position="end">
                <IconButton className={journalStyles.AddBtn} onClick={secondEvent}>
                  <AddIcon className={journalStyles.Publish} />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={journalStyles.menubar} onClick={handleClose}>
          Cancel
        </MenuItem>
        <MenuItem className={journalStyles.menubar} onClick={handleClose}>
          Reschedule
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default JournalTodo;
