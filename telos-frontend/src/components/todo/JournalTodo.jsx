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
  TextField,
  DialogActions,
  makeStyles,
  MenuItem,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ErrorIcon from '@material-ui/icons/Error';
import { useEffect, useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './JournalTodo.module.css';
import './JournalTodoCheckbox.css';

const axios = require('axios');

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    boxShadow:
      '0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2)',
    width: 221,
  },
  button: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  migrate: {
    width: 280,
  },
});

const JournalTodo = ({ data, date }) => {
  const [todos, setTodos] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cancel, setCancel] = useState([0]);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [todoName, setTodoName] = useState('');
  const [todoDueDate, setTodoDueDate] = useState();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [migrate, setMigrate] = useState(false);

  // sets to dos needed for the day
  useEffect(() => {
    setTodos(data);
  }, [data]);

  // Indicates that the '+' sign is clicked and a new to do needs to be added
  const handleClickModal = () => {
    setOpen(true);
  };

  // Indicates that any component that is currently opened needs to be closed
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  // Adds the new to do to the list and sets variables to bind it to a name and date
  const handleAdd = () => {
    const body = {
      name: todoName,
      createdDate: date,
      dueDate: todoDueDate,
    };

    axios.post('/api/todo', body).then((res) => {
      const newTodo = res.data;
      setTodos([...todos, newTodo]);
      setTodoName('');
      setTodoDueDate('');
    });
  };

  // Locates the current index and checks if it is the one that is being cancelled
  // If it is, the selected to do will get added into the cancel array
  const cancelEvent = () => {
    const currentIndex = cancel.indexOf(selectedTodo);
    const newCancel = [...cancel];
    if (currentIndex === -1) {
      newCancel.push(selectedTodo);
    } else {
      newCancel.splice(currentIndex, 1);
    }
    setCancel(newCancel);
  };

  // Creates a new To Do List by filtering the existing to do's and checking if it needs to be cancelled
  const deleteEvent = () => {
    axios.delete(`/api/todo/${selectedTodo._id}`);
    setTodos(todos.filter((todo) => todo !== selectedTodo));
  };

  // To set the state of migrate once it has been pressed in the menu button as the user indicates that they need to change the date
  const openMigrate = () => {
    setMigrate(true);
  };

  // To indicate that the state of migrate has changed as the user is no longer on the button
  const closeMigrate = () => {
    setMigrate(false);
  };

  // Sets the selected to do to checked/completed if the user clicks on the selected item
  // Will add the completed item to the completed array
  const handleToggle = (todo) => {
    const { _id, completed } = todo;

    axios.put(`/api/todo/${_id}`, { completed: !completed });

    const index = todos.indexOf(todo);
    const newTodos = [...todos];

    const newTodo = { ...todo };
    newTodo.completed = !completed;
    newTodos[index] = newTodo;

    setTodos(newTodos);
  };

  return (
    <Box className={classes.root} display="flex" flexDirection="column" alignItems="stretch">
      {/* Setting the title of the To Do List, with customised styles added in the css file */}
      <div>
        <p className={styles.title}> To Do </p>
      </div>
      <Divider />

      {/* Generates a List of To Do's for the day by mapping the value to a index */}
      <List>
        {todos.map((todo, index) => {
          const labelId = `checkbox-list-label-${todo}`;
          return (
            // Item is binded with a name key and when it is pressed the item will become completed
            <ListItem
              className={styles.tasks}
              key={todo._id}
              role={undefined}
              dense
              button
              onClick={() => handleToggle(todo)}
            >
              {/* Checks if the to do is overdue or not, if the task is overdue then the task will be displayed in red */}
              {todo.isOverdue ? (
                <ListItemIcon>
                  {/* Checkbox properties so the user can see if to do has been completed or not */}
                  <Checkbox
                    edge="start"
                    className={styles.checkboxOverdue}
                    checked={todo.completed} // Checks if the item is completed or not
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
              ) : (
                <ListItemIcon>
                  {/* Overdue checkbox properties */}
                  <Checkbox
                    className={styles.checkbox}
                    color="primary"
                    edge="start"
                    checked={todo.completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
              )}
              {todo.isOverdue ? (
                // Displays the description of the to do list item, if a to do is cancelled on the day then it will be presented with a line through the text
                // If it is not cancelled, text will appear as normal
                <ListItemText
                  style={{
                    textDecorationLine: cancel.indexOf(todos[index]) !== -1 ? 'line-through' : '',
                    textDecorationStyle: cancel.indexOf(todos[index]) !== -1 ? 'solid' : '',
                    color: '#FF0000',
                  }}
                  primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
                  id={labelId}
                  primary={` ${todo.name}`}
                />
              ) : (
                // Displays the description in red as it is overdue
                <ListItemText
                  primaryTypographyProps={{ style: { fontWeight: 'bold' } }}
                  style={{
                    textDecorationLine: cancel.indexOf(todos[index]) !== -1 ? 'line-through' : '',
                    textDecorationStyle: cancel.indexOf(todos[index]) !== -1 ? 'solid' : '',
                    color: todo.completed ? 'rgba(98,0,238,1)' : 'rgba(0, 0, 0, 0.6)',
                  }}
                  id={labelId}
                  primary={` ${todo.name}`}
                />
              )}
              {/* The Icons (secondary action) are different depending on if the task is overdue. 
              A verticle three dot icon button will be displayed and it will set the index of what to do has been selected */}
              {todo.isOverdue ? (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      setSelectedTodo(todo);
                      setAnchorEl(event.currentTarget);
                    }}
                  >
                    <ErrorIcon style={{ color: '#EB5757' }} />
                  </IconButton>
                </ListItemSecondaryAction>
              ) : (
                // Secondary action will display an icon button with an exclaimation mark to indicate that the task is over due. To action what to do with the task, user needs to click the icon for options. Sets the active index to the to do that was selected
                <ListItemSecondaryAction>
                  <IconButton
                    className={styles.moreButton}
                    edge="end"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      setSelectedTodo(todo);
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
       {/* A textbox to indicate to the user that they can enter new to do's.
       Text box has been disabled for typing to avoid confusion and allow the user to enter a new to do once they click on the + sign */}
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">New To Do</InputLabel>
          <OutlinedInput
            disabled
            id="outlined-disabled"
            label="Disabled"
            endAdornment={
              // When the user clicks on the button a modal will pop up allowing the user to set their requirements 
              <InputAdornment position="end">
                <IconButton
                  className={styles.AddBtn}
                  variant="outlined"
                  color="primary"
                  onClick={handleClickModal}
                  id="simple-modal"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                >
                  <AddIcon className={styles.Publish} aria-controls="simple-modal" />
                </IconButton>
                {/* The modal that will be displayed for the user to input their description and due date 
                  User input is stored and added into the new item list */}
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">New To Do</DialogTitle>
                  <DialogContent>
                    {/* For the user to enter their description of the task */}
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      value={todoName}
                      onChange={(e) => setTodoName(e.target.value)}
                      label="Description"
                      fullWidth
                    />

                    {/* For the user to set their due date of the task, can also pick the date from the calendar */}
                    <TextField
                      id="date"
                      label="Due Date:"
                      labelColour="black"
                      type="date"
                      value={todoDueDate}
                      onChange={(e) => setTodoDueDate(e.target.value)}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </DialogContent>

                  {/* Button to for the user to cancel or Confirm. If the user confirms, the date and description will be set. If the user cancels then nothing will be set */}
                  <DialogActions>
                    <Button className={classes.button} onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      className={classes.button}
                      label="Button"
                      // Once either buttons has been pressed then the modal will close to show other components.
                      onClick={() => {
                        handleAdd();
                        handleClose();
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
        onClose={handleClose}
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
          {/* Menu will show as 'Uncancel' when the user selects cancel to cancel a to do */}
          {cancel.indexOf(selectedTodo) !== -1 ? 'Uncancel' : 'Cancel'}
        </MenuItem>

        {/* Deletes the selected To Do from the to do list */}
        <MenuItem
          id="delete"
          className={styles.menubar}
          onClick={() => {
            deleteEvent();
            setAnchorEl(null);
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      {/* A pop up modal will show up once migrate is set to true. User can set new date to move to and new due date */}
      <Dialog open={migrate} onClose={closeMigrate} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Migrate Event</DialogTitle>
        <DialogContent className={classes.migrate}>
          <form noValidate>
            { /* Change move to date */}
            <TextField
              id="date"
              label="Move to:"
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
        <DialogContent>
          <form noValidate>
            {/* User changes the due date. However it was optional */}
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
              deleteEvent();
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

export default JournalTodo;
