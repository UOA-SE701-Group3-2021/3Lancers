import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useState } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './react-big-calendar.css';

const localizer = momentLocalizer(moment);

const sendAddEventRequest = () => {
  const a = 'temp';
  return a;
};

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const DashboardCalendar = () => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [events, setEvents] = useState([
    {
      id: 14,
      title: 'Today',
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
    {
      id: 23,
      title: 'Go to the gym 💪',
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 5)),
    },
  ]);

  return (
    <div>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: window.screen.height - 110, width: '100%' }}
        onSelectEvent={(event) => {
          setSelectedId(event.id);
          handleClickOpen();
        }}
        onSelectSlot={({ start, end }) => {
          // eslint-disable-next-line no-alert
          const title = window.prompt('New Event name');
          if (title) {
            const id = getRandomInt(1000);
            setEvents([
              ...events,
              {
                id,
                title,
                start,
                end,
              },
            ]);
          }
          sendAddEventRequest();
        }}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this event?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setEvents(events.filter((e) => e.id !== selectedId));
              handleClose();
            }}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DashboardCalendar;
