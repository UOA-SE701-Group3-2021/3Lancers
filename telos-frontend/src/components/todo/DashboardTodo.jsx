/* eslint-disable arrow-body-style */
/* eslint-disable no-restricted-syntax */
// these eslint rules are disabled to allow  sortEvent() function properly.
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
  Dialog,
  Button,
  Menu,
  MenuItem,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ErrorIcon from '@material-ui/icons/Error';
import styles from './DashboardTodo.module.css';

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
    marginRight: theme.spacing(1),
  },
}));

const outdated = {
  color: 'red',
};

const DashboardTodo = () => {
  const listitems = [
    {
      name: 'isOverdue',
      due: '2021-04-30',
      isOverdue: true,
      completed: false,
    },
    {
      name: 'OutDated',
      due: '2021-01-30',
      isOverdue: false,
      completed: true,
    },
    {
      name: '一二三四五',
      due: '2021-04-30',
      isOverdue: true,
      completed: true,
    },
    {
      name: '上山打老虎',
      due: '2021-04-30',
      isOverdue: true,
      completed: false,
    },
  ];

  const classes = useStyles();
  const [todoName, setTodoName] = useState('');
  const [todoDueDate, setTodoDueDate] = useState('2021-01-01');
  const [newItem, setNewItem] = useState(listitems);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cancel, setCancel] = useState([0]);
  const [reDate, setReDate] = useState('');
  const [selectedTodo, setselectedTodo] = useState('');
  const [open, setOpen] = useState(false);
  const [migrate, setMigrate] = useState(false);

  function dateToTimestamp(endTime) {
    const date = new Date();
    date.setFullYear(endTime.substring(0, 4));
    date.setMonth(endTime.substring(5, 7) - 1);
    date.setDate(endTime.substring(8, 10));
    return Date.parse(date) / 1000;
  }

  // Sort event in order of time
  const sortEvent = () => {
    const sorted = newItem.sort((a, b) => {
      return dateToTimestamp(a.due) - dateToTimestamp(b.due);
    });
    setNewItem(sorted);
  };

  // Change date for reschedule
  const reDateChange = (event) => {
    setReDate(event.target.value);
    setselectedTodo({
      name: selectedTodo.name,
      due: event.target.value,
      isOverdue: true,
      completed: false,
    });
  };

  // handle checkbox
  const handleToggle = (value) => () => {
    const newList = [...newItem];
    for (const x of newList) {
      if (x.name === value) {
        x.completed = !x.completed;
      }
    }

    setNewItem(newList);
  };

  const openAdd = () => {
    setOpen(true);
  };

  const closeAdd = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const firstEvent = (event) => {
    setTodoName({ name: event.target.value, due: todoDueDate, isOverdue: true, completed: false });
  };

  const dateChange = (event) => {
    setTodoDueDate(event.target.value);
    setTodoName({
      name: todoName.name,
      due: event.target.value,
      isOverdue: true,
      completed: false,
    });
  };

  const openMigrate = () => {
    setMigrate(true);
  };

  const closeMigrate = () => {
    setMigrate(false);
    sortEvent();
  };

  const secondEvent = () => {
    setNewItem((prev) => [...prev, todoName]);
    sortEvent();
  };
  const handleOption = (value) => (event) => {
    setselectedTodo({
      name: value.name,
      due: value.due,
      isOverdue: value.isOverdue,
      completed: value.completed,
    });
    setAnchorEl(event.currentTarget);
  };

  const cancelEvent = () => {
    const currentIndex = cancel.indexOf(selectedTodo.name); 
    const newCancel = [...cancel];
    if (currentIndex === -1) {
      newCancel.push(selectedTodo.name);
    } else {
      newCancel.splice(currentIndex, 1);
    }
    setCancel(newCancel);
  };

  const deleteEvent = () => {
    const newList = [...newItem];
    for (const x of newList) {
      if (x.name === selectedTodo.name) {
        const index = newList.indexOf(x);
        newList.splice(index, 1);
      }
    }

    setNewItem(newList);
    setAnchorEl(null);
  };

  const scheduleEvent = () => {
    const newList = [...newItem];
    const selectedTodoInst = selectedTodo;

    for (const x of newList) {
      if (x.name === selectedTodoInst.name) {
        x.due = selectedTodoInst.due;
      }
    }

    setNewItem(newList);
    closeMigrate();
    setAnchorEl(null);
  };

  return (
    <Box className={styles.container}>
      <div className={styles.header}>
        <p> To Do </p>
      </div>
      <Divider />
      <List className={classes.root}>
        {newItem.map((todo) => {
          const labelId = `checkbox-list-label-${todo}`;
          return (
            <ListItem
              className={styles.tasks} 
              key={todo.name}
              role={undefined}
              dense
              button
              onClick={handleToggle(todo.name)} 
            >
              {todo.isOverdue ? (
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    style={{ color: '#6200EE' }} 
                    checked={todo.completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
              ) : (
                <ListItemIcon>
                  <Checkbox
                    className={styles.checkbox}
                    edge="start"
                    color="primary"
                    checked={todo.completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
              )}
              {todo.isOverdue ? (
                <ListItemText
                  id={labelId}
                  primary={` ${todo.name}`}
                  secondary={` ${todo.due}`}
                  style={{
                    textDecorationLine: cancel.indexOf(todo.name) !== -1 ? 'line-through' : '',
                    textDecorationStyle: cancel.indexOf(todo.name) !== -1 ? 'solid' : '',
                  }}
                />
              ) : (
                <ListItemText
                  primaryTypographyProps={{ style: outdated }} 
                  style={{
                    textDecorationLine: cancel.indexOf(todo.name) !== -1 ? 'line-through' : '',
                    textDecorationStyle: cancel.indexOf(todo.name) !== -1 ? 'solid' : '',
                    color: todo.completed ? 'rgba(98,0,238,1)' : 'rgba(0, 0, 0, 0.6)',
                  }}
                  id={labelId}
                  primary={` ${todo.name}`}
                  secondary={` ${todo.due}`}
                />
              )}
              {todo.isOverdue ? (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="schedule" 
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleOption(todo)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              ) : (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="schedule"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleOption(todo)}
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
        <FormControl className={styles.inputbox} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">New To Do</InputLabel>
          <OutlinedInput
            disabled
            id="outlined-disabled"
            label="Disabled"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  className={styles.AddBtn}
                  variant="outlined"
                  color="primary"
                  onClick={openAdd} 
                  id="simple-modal"
                  anchorEl={anchorEl}
                  add={Boolean(anchorEl)}
                >
                  <AddIcon className={styles.Publish} aria-controls="simple-modal" />
                </IconButton>
                <Dialog open={open} onClose={closeAdd} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">New To Do</DialogTitle>
                  <DialogContent>
                    <form className={classes.datecontainer} noValidate>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={todoName.name}
                        onChange={firstEvent}
                        label="Description"
                        fullWidth
                      />
                      <TextField
                        id="date"
                        label="Due Date:"
                        labelColour="black"
                        type="date"
                        value={todoDueDate}
                        onChange={dateChange}
                        className={classes.datetextField}
                        fullWidth 
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button className={classes.button} onClick={closeAdd}>
                      Cancel
                    </Button>
                    <Button
                      className={classes.button}
                      label="Button"
                      onClick={() => {
                        secondEvent();
                        closeAdd();
                      }}
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
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
        onClose={closeMigrate} 
      >
        <MenuItem
          className={styles.menubar}
          onClick={() => {
            openMigrate();
            setAnchorEl(null);
          }}
        >
          Migrate
        </MenuItem>
        <MenuItem
          className={styles.menubar}
          onClick={() => {
            cancelEvent();
            setAnchorEl(null);
          }}
        >
          {cancel.indexOf(selectedTodo.name) !== -1 ? 'Uncancel' : 'Cancel'}
        </MenuItem>
        <MenuItem
          id="delete"
          className={styles.menubar}
          onClick={() => {
            deleteEvent();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <Dialog open={migrate} onClose={closeMigrate} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Migrate Event</DialogTitle>
        <DialogContent className={classes.migrate}>
          <form className={classes.datecontainer} noValidate>
            <TextField
              id="date"
              label="Move to:"
              labelColour="black"
              type="date"
              value={reDate}
              onChange={reDateChange}
              className={classes.datetextField}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </DialogContent>
        <DialogContent>
          <form noValidate>
            <TextField
              id="date"
              label="Edit Due Date(optional):"
              labelColour="black"
              type="date"
              defaultValue="2020-05-24"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.button}
            onClick={() => {
              setMigrate(false);
              setAnchorEl(null);
            }}
          >
            Cancel
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              scheduleEvent();
              setMigrate(false);
              setAnchorEl(null);
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardTodo;
