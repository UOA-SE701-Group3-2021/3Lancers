import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, IconButton, MenuItem } from '@material-ui/core';
import {
  Menu as MenuIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon,
  ImportContacts as ImportContactsIcon,
  CalendarToday as CalendarTodayIcon,
  CheckBox as CheckBoxIcon,
  MoreHoriz as MoreHorizIcon,
  Cancel as CancelIcon,
} from '@material-ui/icons';

//  Used to define styles of MUI components.
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#7A00F4',
  },
  rightSide: {
    marginLeft: 'auto',
    marginRight: -12,
  },
  userButton: {
    marginLeft: 15,
  },
}));

//  Top bar which can be rendered at the top of any page and includes menu, users and settings buttons.
const TopBar = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  function menuOpenHandler(event) {
    setAnchorEl(event.currentTarget);
  }

  function menuCloseHandler() {
    setAnchorEl(null);
  }

  function menuChoiceHandler(widget) {
    if (widget) {
      history.push(`/${widget}`);
    }
    menuCloseHandler();
  }

  //   Stub for user button handler
  function userMenuHandler() {}

  //   Stub for settings button handler
  function settingsMenuHandler() {}

  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton onClick={menuOpenHandler} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6">Telos</Typography>

          <section className={classes.rightSide}>
            <IconButton onClick={settingsMenuHandler} edge="start" color="inherit">
              <SettingsIcon />
            </IconButton>
            <IconButton
              onClick={userMenuHandler}
              edge="start"
              color="inherit"
              className={classes.userButton}
            >
              <AccountCircleIcon />
            </IconButton>
          </section>
        </Toolbar>
      </AppBar>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={menuCloseHandler}
      >
        <MenuItem onClick={() => menuChoiceHandler('journal')}>
          <ImportContactsIcon />
          Journal
        </MenuItem>
        <MenuItem onClick={() => menuChoiceHandler('calendar')}>
          <CalendarTodayIcon />
          Calendar
        </MenuItem>
        <MenuItem onClick={() => menuChoiceHandler('todo')}>
          <CheckBoxIcon />
          Todo List
        </MenuItem>
        <MenuItem onClick={() => menuChoiceHandler('habittracker')}>
          <MoreHorizIcon />
          Habit Tracker
        </MenuItem>
        <MenuItem onClick={menuCloseHandler}>
          <CancelIcon />
          Cancel
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TopBar;
