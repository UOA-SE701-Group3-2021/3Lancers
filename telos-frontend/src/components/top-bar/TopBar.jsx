import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CancelIcon from '@material-ui/icons/Cancel';

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
  function userMenuHandler() {
    console.log('User button clicked');
  }

  //   Stub for settings button handler
  function settingsMenuHandler() {
    console.log('Settings button clicked');
  }

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
