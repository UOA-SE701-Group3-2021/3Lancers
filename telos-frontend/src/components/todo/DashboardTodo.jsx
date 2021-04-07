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
    height: 'auto',
    maxHeight: '60vh',
    overflow: 'auto',
  },
  datecontainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  datetextField: {
    marginRight: theme.spacing(1),
  },
}));

const outdated = {
  color: 'red',
  fontWeight: 'Bold',
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
      isOverdue: false,
      completed: false,
    });
  };

  // Sets the selected to do to checked/completed if the user clicks on the selected item
  // Will add the completed item to the completed array
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

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  // Adding a todo from the 'New to do' dialog
  const firstEvent = (event) => {
    setTodoName({ name: event.target.value, due: todoDueDate, isOverdue: true, completed: false });
  };

  const dateChange = (event) => {
    setTodoDueDate(event.target.value);
    setTodoName({
      name: todoName.name,
      due: event.target.value,
      isOverdue: false,
      completed: false,
    });
  };

  // To set the state of migrate once it has been pressed in the menu button as the user indicates that they need to change the date
  const openMigrate = () => {
    setMigrate(true);
  };

  // To indicate that the state of migrate has changed as the user is not longer on the button
  const closeMigrate = () => {
    setMigrate(false);
    sortEvent();
  };

  const secondEvent = () => {
    if (open) {
      setNewItem((prev) => [...prev, todoName]);
    }
    // removed sorting
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

  // Looks for todolist item by name to cancel, delete and schedule

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
      {/* Setting the title of the To Do List, with customised styles added in the css file */}
      <div className={styles.header}>
        <p> To Do </p>
      </div>
      <Divider />
      <List className={classes.root}>
        {newItem.map((todo) => {
          const labelId = `checkbox-list-label-${todo}`;
          return (
            // Item is binded with a name key and when it is pressed the item will become completed
            <ListItem
              className={styles.tasks}
              key={todo.name}
              role={undefined}
              dense
              button
              onClick={handleToggle(todo.name)}
            >
              {/* Checks if the to do is overdue or not, if the task is overdue then the task will be displayed in red */}
              {!todo.isOverdue ? (
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
                  {/* Overdue checkbox properties */}
                  <Checkbox
                    className={styles.checkboxOverdue}
                    edge="start"
                    color="primary"
                    checked={todo.completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
              )}
              {!todo.isOverdue ? (
                // Displays the description of the to do list item, if a to do is cancelled on the day then it will be presented with a line through the text
                // If it is not cancelled, text will appear as normal
                <ListItemText
                  id={labelId}
                  primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
                  primary={` ${todo.name}`}
                  secondary={` ${todo.due}`}
                  style={{
                    textDecorationLine: cancel.indexOf(todo.name) !== -1 ? 'line-through' : '',
                    textDecorationStyle: cancel.indexOf(todo.name) !== -1 ? 'solid' : '',
                    color: todo.completed ? 'rgba(98,0,238,1)' : 'rgba(0, 0, 0, 0.6)',
                  }}
                />
              ) : (
                // Displays the description in red as it is overdue
                <ListItemText
                  primaryTypographyProps={{ style: outdated }}
                  style={{
                    textDecorationLine: cancel.indexOf(todo.name) !== -1 ? 'line-through' : '',
                    textDecorationStyle: cancel.indexOf(todo.name) !== -1 ? 'solid' : '',
                  }}
                  id={labelId}
                  primary={` ${todo.name}`}
                  secondary={` ${todo.due}`}
                />
              )}
              {/* The Icons (secondary action) are different depending on if the task is overdue. 
              A verticle three dot icon button will be displayed and it will set the index of what to do has been selected */}
              {!todo.isOverdue ? (
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
                // Secondary action will display an icon button with an exclaimation mark to indicate that the task is over due. To action what to do with the task, user needs to click the icon for options
                // Sets the active index to the to do that was selected
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
        {/* A textbox to indicate to the user that they can enter new to do's 
        Text box has been disabled for typing to avoid confusion and allow the user to enter a new to do once they click on the + sign  */}
        <FormControl className={styles.inputbox} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">New To Do</InputLabel>
          {/* Indicates the style of the text box */}
          <OutlinedInput
            disabled
            id="outlined-disabled"
            label="Disabled"
            endAdornment={
              <InputAdornment position="end">
                {/* When the user clicks on the button a modal will pop up allowing the user to set their requirements */}
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
                {/* The modal that will be displayed for the user to input their description and due date 
                  User input is stored and added into the new item list */}
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                      {/* For the user to set their due date of the task, can also pick the date from the calendar  */}
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
                  {/* Button to for the user to cancel or Confirm
                  If the user confirms, the date and description will be set. If the user cancels then nothing will be set */}
                  <DialogActions>
                    <Button className={classes.button} onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      className={classes.button}
                      label="Button"
                      // Once either buttons has been pressed then the modal will close to show other components
                      onClick={() => {
                        handleClose();
                        secondEvent();
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
      {/* A display menu to display options of what the users can do with the selected to do */}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMigrate}
      >
        {/* Migrate will be set to true so the modal will show up allowing the users to select new dates */}
        <MenuItem
          className={styles.menubar}
          onClick={() => {
            openMigrate();
            setAnchorEl(null);
          }}
        >
          Migrate
        </MenuItem>
        {/* Allows user to cancel the selected to do on the day */}
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
      {/* Opens dialog for rescheduling exisiting todo date or due */}
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
