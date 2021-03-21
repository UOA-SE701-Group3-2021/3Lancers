import { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import {
  IconButton,
  Box,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import WeekScheduleBar from './WeekScheduleBarHabitTracker';
import habitStyle from './DashboardHabitTracker.module.css';

const DashboardHabitTracker = () => {
  const [habitTitle, setTitle] = useState('Habit1');
  const [tempTitle, setTempTitle] = useState(habitTitle);
  const [habitDes, setDes] = useState('Habit description, Do Task X, Y many times per week');
  const [tempDes, setTempDes] = useState(habitDes);

  const [weeks, setWeeks] = useState('1');
  const [startDate, setStartDate] = useState('2021-01-01');
  const [endType, setEndType] = useState('Never');
  const [endDate, setEndDate] = useState('');

  const [isEdit, setEditStatus] = useState(false);

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

  const saveChange = () => {
    setTitle(tempTitle);
    setDes(tempDes);
  };

  return (
    <div>
      <div className={habitStyle.container}>
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
      <Box className={`${isEdit === true ? habitStyle.menuContainer : habitStyle.hidden}`}>
        <div className={habitStyle.menuHeader}>
          <Button
            id="saveButton"
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
            id="closeButton"
            variant="contained"
            onClick={() => {
              setEditStatus(false);
              setTempTitle(habitTitle);
              setTempDes(habitDes);
            }}
          >
            x
          </Button>
        </div>
        <div className={habitStyle.menuBody}>
          <div className={habitStyle.habitInfo}>
            <div className={habitStyle.habitName}>
              <InputLabel id="name">Name:</InputLabel>
              <TextField
                id="standard-basic"
                value={tempTitle}
                onChange={handleChangeOnName}
                fullWidth
              />
            </div>
            <div className={habitStyle.habitDetail}>
              <InputLabel id="description">Description:</InputLabel>
              <TextField
                id="standard-basic"
                value={tempDes}
                onChange={handleChangeOnDes}
                fullWidth
              />
            </div>
          </div>
          <div className={habitStyle.weekInfo}>
            <InputLabel id="repeatsOn">Repeats on</InputLabel>
            <WeekScheduleBar />
          </div>
          <div className={habitStyle.timeSetting}>
            <div className={habitStyle.startDate}>
              <InputLabel id="start">Starts:</InputLabel>
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
              <InputLabel id="selectWeeks">Repeats every</InputLabel>
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
              <InputLabel id="end">Ends:</InputLabel>
              <RadioGroup
                row
                aria-label="endType"
                name="endType"
                value={endType}
                onChange={handleChangeOnEndType}
              >
                <FormControlLabel value="Never" control={<Radio color="primary" />} label="Never" />
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
    </div>
  );
};

export default DashboardHabitTracker;
