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
  const listitems = [
    {
      name: 'OnGoing',
      onGoing: true,
      completed: false,
    },
    {
      name: 'OutDated',
      onGoing: false,
      completed: true,
    },
  ];
  const [checked, setChecked] = useState([0]);
  const [item, setItem] = useState('');
  const [newItem, setNewItem] = useState(listitems);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cancel, setCancel] = useState([0]);
  const [deleted, setDelete] = useState([0]);
  const [toBeDel, setToBeDel] = useState('');
  const [reDate, setReDate] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [input, inputEntered] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cancelEvent = () => {
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
    const newList = [...newItem];

    // eslint-disable-next-line no-restricted-syntax
    for (const x of newList) {
      if (x.name === toBeDel) {
        const index = newList.indexOf(x);
        newList.splice(index, 1);
      }
    }

    setNewItem(newList);
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
  // const inputAlert = () => {
  //   alert('Please enter something :)');
  // };
  const firstEvent = (event) => {
    setItem({ name: event.target.value, onGoing: true, completed: false });
  };

  const secondEvent = () => {
    setNewItem((prev) => [...prev, item]);
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
              key={value.name}
              role={undefined}
              dense
              button
              onClick={handleToggle(value)}
            >
              {value.onGoing ? (
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
              ) : (
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
              )}
              {value.onGoing ? (
                <ListItemText
                  style={{
                    textDecorationLine: cancel.indexOf(newItem[index]) !== -1 ? 'line-through' : '',
                    textDecorationStyle: cancel.indexOf(newItem[index]) !== -1 ? 'solid' : '',
                    color: 'rgba(0, 0, 0, 0.6)',
                  }}
                  id={labelId}
                  primary={` ${value.name}`}
                />
              ) : (
                <ListItemText
                  style={{
                    textDecorationLine: cancel.indexOf(newItem[index]) !== -1 ? 'line-through' : '',
                    textDecorationStyle: cancel.indexOf(newItem[index]) !== -1 ? 'solid' : '',
                    color: '#EB5757',
                  }}
                  primaryTypographyProps={{ style: outdated }}
                  id={labelId}
                  primary={` ${value.name}`}
                />
              )}
              {value.onGoing ? (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      setToBeDel(value.name);
                      setActiveIndex(index);
                      setAnchorEl(event.currentTarget);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              ) : (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      setToBeDel(value.name);
                      setActiveIndex(index);
                      setAnchorEl(event.currentTarget);
                    }}
                  >
                    <ErrorIcon style={{ color: '#EB5757' }} />
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
            value={item.name}
            onChange={firstEvent}
            disable
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
            cancelEvent();
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
