import { InputLabel, TextField } from '@material-ui/core';
import WeekScheduleBar from './WeekScheduleBarHabitTracker';
import habitStyle from './HabitTracker.module.css';
// This react component draws a Material-UI Habit Tracker in Journal View for the user to note their habituals
const DashboardHabitTracker = () => (
  // Main window of the widgets
  <div>
    <div className={habitStyle.cardContainer}>
      <div className={habitStyle.habitName}>
        <InputLabel id={habitStyle.name}>Name:</InputLabel>
        <TextField id="standard-basic" fullWidth />
      </div>
      <div className={habitStyle.habitDetail}>
        <InputLabel id={habitStyle.description}>Description:</InputLabel>
        <TextField id="standard-multiline-flexible" fullWidth rowsMax={2} multiline />
      </div>
      <WeekScheduleBar />
    </div>
    <div className={habitStyle.cardContainer}>
      <div className={habitStyle.habitName}>
        <InputLabel id={habitStyle.name}>Name:</InputLabel>
        <TextField id="standard-basic" fullWidth />
      </div>
      <div className={habitStyle.habitDetail}>
        <InputLabel id={habitStyle.description}>Description:</InputLabel>
        <TextField id="standard-multiline-flexible" fullWidth rowsMax={2} multiline />
      </div>
      <WeekScheduleBar />
    </div>
    <div className={habitStyle.cardContainer}>
      <div className={habitStyle.habitName}>
        <InputLabel id={habitStyle.name}>Name:</InputLabel>
        <TextField id="standard-basic" fullWidth />
      </div>
      <div className={habitStyle.habitDetail}>
        <InputLabel id={habitStyle.description}>Description:</InputLabel>
        <TextField id="standard-multiline-flexible" fullWidth rowsMax={2} multiline />
      </div>
      <WeekScheduleBar />
    </div>
    <div className={habitStyle.cardContainer}>
      <div className={habitStyle.habitName}>
        <InputLabel id={habitStyle.name}>Name:</InputLabel>
        <TextField id="standard-basic" fullWidth />
      </div>
      <div className={habitStyle.habitDetail}>
        <InputLabel id={habitStyle.description}>Description:</InputLabel>
        <TextField id="standard-multiline-flexible" fullWidth rowsMax={2} multiline />
      </div>
      <WeekScheduleBar />
    </div>
  </div>
);

export default DashboardHabitTracker;
