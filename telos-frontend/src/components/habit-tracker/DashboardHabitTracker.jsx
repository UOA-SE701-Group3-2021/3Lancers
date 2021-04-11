import { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
  IconButton,
  Box,
  Button,
  Dialog,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import WeekScheduleBar from './WeekScheduleBarHabitTracker';
import habitStyle from './HabitTracker.module.css';

// This react component draws a Material-UI Habit Tracker in Journal View for the user to note their habituals
const DashboardHabitTracker = () => {
  // The functions that update and save the changes
  const [habitTitle, setTitle] = useState('Habit1');
  const [tempTitle, setTempTitle] = useState(habitTitle);
  const [habitDes, setDes] = useState('Habit description, Do Task X, Y many times per week');
  const [tempDes, setTempDes] = useState(habitDes);
  const [weeks, setWeeks] = useState('1');
  const [startDate, setStartDate] = useState('2021-01-01');
  const [endType, setEndType] = useState('Never');
  const [endDate, setEndDate] = useState('');

  // If the add button of the main widget is clicked, isEdit will become true then unhides the pop-out window.
  // If the save or close buttons of the pop-out window is clicked, isEdit will become false then hides the pop-out window.
  const [isEdit, setEditStatus] = useState(false);

  // The following functions are for saving the drafts
  const handleChangeOnName = (event) => {
    setTempTitle(event.target.value);
  };

  const handleChangeOnDes = (event) => {
    setTempDes(event.target.value);
  };

  const handleChangeOnWeeks = (event) => {
    setWeeks(event.target.value);
  };

  const handleChangeOnStartDate = (event) => {
    setStartDate(event.target.value);
  };

  const handleChangeOnEndDate = (event) => {
    setEndDate(event.target.value);
  };

  const handleChangeOnEndType = (event) => {
    setEndType(event.target.value);
  };

  // Save the changes and render
  const saveChange = () => {
    setTitle(tempTitle);
    setDes(tempDes);
  };

  return (
    // Main window of the widgets
    <div>
      <div className={habitStyle.cardContainer}>
        <div className={habitStyle.HabitTitle}>
          <h2>{habitTitle}</h2>
          <span className={habitStyle.AddIcon}>
            <IconButton onClick={() => setEditStatus(true)}>
              <AddIcon />
            </IconButton>
          </span>
        </div>
        <div className={habitStyle.HabitContent}>
          <p>{habitDes}</p>
        </div>
        <WeekScheduleBar />
      </div>
      {/* Pop out window of the widget */}
      <Dialog
        open={isEdit}
        onClose={() => {
          setEditStatus(false);
        }}
        classes={{
          root: {
            borderRadius: 16,
          },
        }}
        aria-labelledby="form-dialog-title"
      >
        <Box className={`${isEdit === true ? habitStyle.menuContainer : habitStyle.hidden}`}>
          <div className={habitStyle.menuHeader}>
            <Button
              id={habitStyle.saveButton}
              variant="contained"
              onClick={() => {
                saveChange();
                setEditStatus(false);
              }}
            >
              save
            </Button>
            <h2>New Habit</h2>
            <Button
              id={habitStyle.closeButton}
              variant="contained"
              onClick={() => {
                setEditStatus(false);
                setTempTitle(habitTitle);
                setTempDes(habitDes);
              }}
            >
              ×
            </Button>
          </div>
          <div className={habitStyle.menuBody}>
            <div className={habitStyle.habitInfo}>
              <div className={habitStyle.habitName}>
                <InputLabel id={habitStyle.name}>Name:</InputLabel>
                <TextField
                  id="standard-basic"
                  value={tempTitle}
                  onChange={handleChangeOnName}
                  fullWidth
                />
              </div>
              <div className={habitStyle.habitDetail}>
                <InputLabel id={habitStyle.description}>Description:</InputLabel>
                <TextField
                  id="standard-basic"
                  value={tempDes}
                  onChange={handleChangeOnDes}
                  fullWidth
                />
              </div>
            </div>
            <div className={habitStyle.weekInfo}>
              <InputLabel id={habitStyle.repeatsOn}>Repeats on</InputLabel>
              <WeekScheduleBar />
            </div>
            <div className={habitStyle.timeSetting}>
              <div className={habitStyle.startDate}>
                <InputLabel id={habitStyle.start}>Starts:</InputLabel>
                <TextField
                  id="date"
                  type="date"
                  value={startDate}
                  onChange={handleChangeOnStartDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className={habitStyle.repeat}>
                <InputLabel id={habitStyle.selectWeeks}>Repeats every</InputLabel>
                <Select
                  labelId="selectWeeks"
                  id="demo-simple-select"
                  value={weeks}
                  onChange={handleChangeOnWeeks}
                >
                  <MenuItem value={1}>1 week</MenuItem>
                  <MenuItem value={2}>2 weeks</MenuItem>
                  <MenuItem value={4}>4 weeks</MenuItem>
                  <MenuItem value={6}>6 weeks</MenuItem>
                </Select>
              </div>
              <div className={habitStyle.endDate}>
                <InputLabel id={habitStyle.end}>Ends:</InputLabel>
                <RadioGroup
                  row
                  aria-label="endType"
                  name="endType"
                  value={endType}
                  onChange={handleChangeOnEndType}
                >
                  <FormControlLabel
                    value="Never"
                    control={<Radio color="primary" />}
                    label="Never"
                  />
                  <FormControlLabel value="On" control={<Radio color="primary" />} label="On" />
                  <TextField
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={handleChangeOnEndDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </RadioGroup>
              </div>
            </div>
          </div>
        </Box>
      </Dialog>
    </div>
  );
};

export default DashboardHabitTracker;
