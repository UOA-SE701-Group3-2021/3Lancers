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
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './JournalTodo.css';
import ErrorIcon from '@material-ui/icons/Error';

const outdated = {
  color: '#FF0000',
};

const JournalTodo = () => {
  // const listitems = [
  //   {
  //     name: 'OnGoing',
  //     onGoing: true,
  //     completed: false,
  //   },
  //   {
  //     name: 'OutDated',
  //     onGoing: false,
  //     completed: true,
  //   },
  // ];

  const [checked, setChecked] = useState([0]);
  const [item, setItem] = useState('');
  const [newItem, setNewItem] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cancel, setCancel] = useState([0]);
  const [deleted, setDelete] = useState([0]);
  const [reDate, setReDate] = useState('');
  const [reEventName, setReEventName] = useState('');
  const [reItem, setReItem] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cancelevent = () => {
    const currentIndex = cancel.indexOf(newItem[activeIndex]);
    const newCancel = [...cancel];

    if (currentIndex === -1) {
      newCancel.push(newItem[activeIndex]);
    } else {
      newCancel.splice(currentIndex, 1);
    }
    setCancel(newCancel);
  };

  const deleteEvent = () => {
    const currentIndex = deleted.indexOf(newItem[activeIndex]);
    const newList = [...newItem];

    if (currentIndex !== -1) {
      newList.push(newItem[activeIndex]);
    } else {
      cancel.splice(currentIndex, 1);
      newList.splice(currentIndex, 1);
    }
    setNewItem(newList);
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
    <Box className="container">
      <div>
        <p className="title"> To Do </p>
      </div>
      <Divider />
      <List>
        {newItem.map((value, index) => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <ListItem
              className="listItem"
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
                    style={{ color: '#EB5757' }}
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
              ) : (
                <ListItemIcon>
                  <Checkbox
                    // checkedIcon={<ArrowForwardIcon />}
                    edge="start"
                    color="primary"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
              )}
              {value.onGoing ? (
                <ListItemText
                  style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                  primaryTypographyProps={{ style: outdated }}
                  id={labelId}
                  primary={` ${value}`}
                />
              ) : (
                <ListItemText
                  style={{
                    textDecorationLine: cancel.indexOf(newItem[index]) !== -1 ? 'line-through' : '',
                    textDecorationStyle: cancel.indexOf(newItem[index]) !== -1 ? 'solid' : '',
                    color: 'rgba(0, 0, 0, 0.6)',
                  }}
                  id={labelId}
                  primary={` ${value}`}
                />
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
                    onClick={(event) => {
                      setActiveIndex(index);
                      setAnchorEl(event.currentTarget);
                    }}
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
                <IconButton className="AddBtn" onClick={secondEvent}>
                  <AddIcon className="Publish" />
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
        <MenuItem
          className="menubar"
          onClick={() => {
            cancelevent();
            setAnchorEl(null);
          }}
        >
          Cancel
        </MenuItem>
        <MenuItem
          className="menubar"
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          Migrate
        </MenuItem>
        <MenuItem
          id="delete"
          className="menubar"
          onClick={() => {
            deleteEvent();
            setAnchorEl(null);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default JournalTodo;
