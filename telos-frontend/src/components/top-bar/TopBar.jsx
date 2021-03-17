import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// Used to define styles of MUI components.
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

const TopBar = () => {
  const classes = useStyles();

  //   Stub for menu button handler
  function menuHandler() {
    console.log('Menu button clicked');
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
            
          <IconButton onClick={menuHandler} edge="start" color="inherit" aria-label="menu">
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
    </div>
  );
};

export default TopBar;
