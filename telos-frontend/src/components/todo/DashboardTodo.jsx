/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ErrorIcon from '@material-ui/icons/Error';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './DashboardTodo.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  datecontainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  datetextField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const listitems = [
  {
    name: 'OnGoing',
    due: '18/03/2021',
    onGoing: true,
  },
  {
    name: 'OutDated',
    due: '16/03/2021',
    onGoing: false,
  },
];

const outdated = {
  color: 'red',
};

const DashboardTodo = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState([0]);
  const [item, setItem] = useState('');
  const [dueDate, setDueDate] = useState('2021-01-01');
  const [newItem, setNewItem] = useState(listitems);
  const [anchorEl, setAnchorEl] = useState(null);

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
    setItem({ name: event.target.value, due: dueDate, onGoing: true });
  };

  const dateChange = (event) => {
    setDueDate(event.target.value);
    setItem({ name: item.name, due: event.target.value, onGoing: true });
  };

  const secondEvent = () => {
    setNewItem((prev) => [...prev, item]);
    setItem('');
  };

  const handleOption = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionClose = () => {
    setAnchorEl(null);
  };

  const inputAlert = () => {
    alert('Please enter something :)');
  };

  return (
    <Box className="container">
      <div className="header">
        <p> To Do </p>
      </div>
      <Divider />
      <List className={classes.root}>
        {newItem.map((value) => {
          const labelId = `checkbox-list-label-${value.name}`;

          return (
            <ListItem
              className="listItem"
              key={value.name}
              role={undefined}
              dense
              button
              onClick={handleToggle(value.name)}
            >
              {value.onGoing ? (
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    style={{ color: '#6200EE' }}
                    checked={checked.indexOf(value.name) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
              ) : (
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    style={{ color: '#FF0000' }}
                    checked={checked.indexOf(value.name) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
              )}
              {value.onGoing ? (
                <ListItemText id={labelId} primary={` ${value.name}`} secondary={` ${value.due}`} />
              ) : (
                <ListItemText
                  primaryTypographyProps={{ style: outdated }}
                  id={labelId}
                  primary={` ${value.name}`}
                  secondary={` ${value.due}`}
                />
              )}
              {value.onGoing ? (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleOption}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              ) : (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="warning"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleOption}
                  >
                    <ErrorIcon className="outdated" />
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
            endAdornment={
              <InputAdornment position="end">
                <IconButton className="AddBtn" onClick={item.name ? secondEvent : inputAlert}>
                  <AddIcon className="Publish" />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <form className={classes.datecontainer} noValidate>
          <TextField
            id="date"
            label="Due date"
            type="date"
            value={dueDate}
            onChange={dateChange}
            className={classes.datetextField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleOptionClose}
      >
        <MenuItem onClick={handleOptionClose}>Option</MenuItem>
        <MenuItem onClick={handleOptionClose}>Option</MenuItem>
        <MenuItem onClick={handleOptionClose}>Option</MenuItem>
      </Menu>
    </Box>
  );
};

export default DashboardTodo;
