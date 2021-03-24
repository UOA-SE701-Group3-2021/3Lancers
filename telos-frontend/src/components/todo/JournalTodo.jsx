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

// const listitems = [
//   {
//     name: 'OnGoing',
//     isOverdue: true,
//     completed: false,
//   },
//   {
//     name: 'OutDated',
//     isOverdue: false,
//     completed: true,
//   },
// ];

const JournalTodo = ({ data, date }) => {
  const [todos, setTodos] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cancel, setCancel] = useState([0]);
  // const [deleted, setDelete] = useState([0]);
  // const [toBeDel, setToBeDel] = useState('');
  // const [newDate, setNewDate] = useState('');
  const [selectedTodo, setSelectedTodo] = useState({});
  const [todoName, setTodoName] = useState('');
  const [todoDueDate, setTodoDueDate] = useState();

  // const [input, inputEntered] = useState('');
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [migrate, setMigrate] = useState(false);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  //   setOpen(true);
  // };
  useEffect(() => {
    setTodos(data);
  }, [data]);

  const handleClickModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

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

  const deleteEvent = () => {
    axios.delete(`/api/todo/${selectedTodo._id}`);
    setTodos(todos.filter((todo) => todo !== selectedTodo));
  };

  const openMigrate = () => {
    setMigrate(true);
  };

  const closeMigrate = () => {
    setMigrate(false);
  };

  // const newDateChange = (event) => {
  //   setNewDate(event.target.value);
  //   setItemDate({
  //     name: todosDate.name,
  //     due: event.target.value,
  //     isOverdue: true,
  //     completed: false,
  //   });
  // };

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

  // const secondEvent = () => {
  //   setTodos((prev) => [...prev, item]);
  // };

  return (
    <Box className={classes.root} display="flex" flexDirection="column" alignItems="stretch">
      <div>
        <p className={styles.title}> To Do </p>
      </div>
      <Divider />
      <List>
        {todos.map((todo, index) => {
          const labelId = `checkbox-list-label-${todo}`;
          return (
            <ListItem
              className={styles.tasks}
              key={todo._id}
              role={undefined}
              dense
              button
              onClick={() => handleToggle(todo)}
            >
              {todo.isOverdue ? (
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    className={styles.checkboxOverdue}
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
        <FormControl variant="outlined">
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
                  onClick={handleClickModal}
                  id="simple-modal"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                >
                  <AddIcon className={styles.Publish} aria-controls="simple-modal" />
                </IconButton>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">New To Do</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      value={todoName}
                      onChange={(e) => setTodoName(e.target.value)}
                      label="Description"
                      fullWidth
                    />
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
                  <DialogActions>
                    <Button className={classes.button} onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      className={classes.button}
                      label="Button"
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
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
          {cancel.indexOf(selectedTodo) !== -1 ? 'Uncancel' : 'Cancel'}
        </MenuItem>
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
      <Dialog open={migrate} onClose={closeMigrate} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Migrate Event</DialogTitle>
        <DialogContent className={classes.migrate}>
          <form noValidate>
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
