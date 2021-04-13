import { useState, useEffect } from 'react';
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

const HabitTrackerCard = ({ habit, newHabit, habits }) => {
  const [habitTracker, setHabitTracker] = useState(habit);
  const [newTitle, setNewTitle] = useState('');
  const [newDes, setNewDes] = useState('');

  // If the add button of the main widget is clicked, isEdit will become true then unhides the pop-out window.
  // If the save or close buttons of the pop-out window is clicked, isEdit will become false then hides the pop-out window.
  const [isEdit, setEditStatus] = useState(false);
  // The following functions are for saving the drafts
  // Save the changes and render
  const saveChange = () => {
    newHabit([
      ...habits,
      {
        title: newTitle,
        des: newDes,
        weeks: '1',
        startDate: '2021-01-01',
        endType: 'Never',
        endDate: '',
      },
    ]);
  };

  const handleChangeOnTitle = (event) => {
    setNewTitle(event.target.value);
  };

  const handleChangeOnDes = (event) => {
    setNewDes(event.target.value);
  };

  useEffect(() => {
    if (!habit) {
      setHabitTracker({
        title: 'Habit 1',
        des: 'Habit description, Do Task X, Y many times per week',
        weeks: '1',
        startDate: '2021-01-01',
        endType: 'Never',
        endDate: '',
      });
    }
    setNewTitle('Habit 1');
    setNewDes('Habit description, Do Task X, Y many times per week');
  }, []);

  return (
    // Main window of the widgets
    <div>
      <div className={habitStyle.cardContainer}>
        <div className={habitStyle.HabitTitle}>
          <h2>{habitTracker.title}</h2>
          <span className={habitStyle.AddIcon}>
            <IconButton onClick={() => setEditStatus(true)}>
              <AddIcon />
            </IconButton>
          </span>
        </div>
        <div className={habitStyle.HabitContent}>
          <h2 style={{ fontFamily: 'monospace' }}>{habitTracker.des}</h2>
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
                  value={newTitle}
                  fullWidth
                  onChange={handleChangeOnTitle}
                />
              </div>
              <div className={habitStyle.habitDetail}>
                <InputLabel id={habitStyle.description}>Description:</InputLabel>
                <TextField
                  id="standard-basic"
                  value={newDes}
                  fullWidth
                  onChange={handleChangeOnDes}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className={habitStyle.repeat}>
                <InputLabel id={habitStyle.selectWeeks}>Repeats every</InputLabel>
                <Select labelId="selectWeeks" id="demo-simple-select">
                  <MenuItem value={1}>1 week</MenuItem>
                  <MenuItem value={2}>2 weeks</MenuItem>
                  <MenuItem value={4}>4 weeks</MenuItem>
                  <MenuItem value={6}>6 weeks</MenuItem>
                </Select>
              </div>
              <div className={habitStyle.endDate}>
                <InputLabel id={habitStyle.end}>Ends:</InputLabel>
                <RadioGroup row aria-label="endType" name="endType">
                  <FormControlLabel
                    value="Never"
                    control={<Radio color="primary" />}
                    label="Never"
                  />
                  <FormControlLabel value="On" control={<Radio color="primary" />} label="On" />
                  <TextField
                    id="endDate"
                    type="date"
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

export default HabitTrackerCard;
