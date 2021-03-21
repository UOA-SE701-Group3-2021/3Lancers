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
import habitStyle from './JournalHabitTracker.module.css';

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
    <div className={habitStyle.container}>
      <div className={habitStyle.HabitualsTitle}>
        <h2 align="middle">Habituals</h2>
        <span className={habitStyle.AddIcon}>
          <IconButton onClick={() => setEditStatus(true)} className={habitStyle.addIconButton}>
            <AddIcon className={habitStyle.addIconButtonSvg} />
          </IconButton>
        </span>
      </div>
      <div className={habitStyle.Habituals}>
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

export default JournalHabitTracker;
