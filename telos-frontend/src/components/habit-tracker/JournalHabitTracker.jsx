import {
  Box,
  Button,
  Dialog,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import WeekScheduleBar from './WeekScheduleBarHabitTracker';
import journalStyles from './JournalHabitTracker.module.css';
import './JournalHabitTracker.css';

const JournalHabitTracker = () => {
  const [habitTitle, setTitle] = useState('');
  const [tempTitle, setTempTitle] = useState(habitTitle);
  const [habitDes, setDes] = useState('');
  const [tempDes, setTempDes] = useState(habitDes);

  const [weeks, setWeeks] = useState('1');
  const [startDate, setStartDate] = useState('2021-01-01');
  const [endType, setEndType] = useState('Never');
  const [endDate, setEndDate] = useState('');

  const [isEdit, setEditStatus] = useState(false);

  const habitList = [
    {
      habitName: 'Jogging',
      start: '2020-01-01',
      end: '2022-01-01',
      eventInToday: true,
    },
    {
      habitName: 'Swimming',
      start: '2019-01-01',
      end: '2020-01-01',
      eventInToday: false,
    },
    {
      habitName: 'Gamming',
      start: '2020-01-01',
      end: '2022-01-01',
      eventInToday: true,
    },
  ];

  // eslint-disable-next-line no-unused-vars
  const [newhabit, setNewhabit] = useState(habitList);

  const addHobby = (HabitName, HabitEtart, HabitEnd, isEventToday) => {
    newhabit.push({
      habitName: HabitName,
      start: HabitEtart,
      end: HabitEnd,
      eventInToday: isEventToday,
    });
  };

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
    addHobby(tempTitle, startDate, endDate, true);
  };

  return (
    <div className={journalStyles.container}>
      <div className={journalStyles.HabitualsTitle}>
        <h2 align="middle">Habituals</h2>
        <span className={journalStyles.AddIcon}>
          <IconButton onClick={() => setEditStatus(true)}>
            <AddIcon />
          </IconButton>
        </span>
      </div>
      <div className={journalStyles.Habituals}>
        <ul>
          {newhabit.map(
            (item, index) =>
              item.eventInToday && (
                <div>
                  <li>{`H${index + 1}`}</li>
                  <p>{item.habitName}</p>
                </div>
              )
          )}
        </ul>
      </div>

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
        <Box className={isEdit === true ? journalStyles.muneContainer : journalStyles.hidden}>
          <div className={journalStyles.menuHeader}>
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
              ×
            </Button>
          </div>
          <div className={journalStyles.menuBody}>
            <div className={journalStyles.habitInfo}>
              <div className={journalStyles.habitName}>
                <InputLabel id="name">Name:</InputLabel>
                <TextField
                  id="standard-basic"
                  value={tempTitle}
                  onChange={handleChangeOnName}
                  fullWidth
                />
              </div>
              <div className={journalStyles.habitDetail}>
                <InputLabel id="description">Description:</InputLabel>
                <TextField
                  id="standard-basic"
                  value={tempDes}
                  onChange={handleChangeOnDes}
                  fullWidth
                />
              </div>
            </div>
            <div className={journalStyles.weekInfo}>
              <InputLabel id="repeatsOn">Repeats on</InputLabel>
              <WeekScheduleBar />
            </div>
            <div className={journalStyles.timeSetting}>
              <div className={journalStyles.startDate}>
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
              <div className={journalStyles.repeat}>
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
              <div className={journalStyles.endDate}>
                <InputLabel id="end">Ends:</InputLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender1"
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

export default JournalHabitTracker;
