import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import axios from 'axios';
import {
  Scheduler,
  DayView,
  Appointments,
  Resources,
  EditRecurrenceMenu,
  AppointmentForm,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import styles from './JournalCalendar.module.css';

// Data to show on the calendar
// const calendarData = [
//   {
//     priorityId: 2,
//     typeId: 1,
//     title: 'Coffee',
//     startDate: new Date('2021-03-21T20:00:00.000Z'),
//     endDate: new Date('2021-03-21T20:30:00.000Z'),
//   },
//   {
//     priorityId: 2,
//     typeId: 2,
//     title: 'SOFTENG 754',
//     startDate: new Date('2021-03-21T21:00:00.000Z'),
//     endDate: new Date('2021-03-21T23:00:00.000Z'),
//   },
//   {
//     priorityId: 2,
//     typeId: 2,
//     title: 'SOFTENG 701',
//     startDate: new Date('2021-03-21T23:00:00.000Z'),
//     endDate: new Date('2021-03-22T01:00:00.000Z'),
//   },
//   {
//     priorityId: 1,
//     typeId: 1,
//     title: 'Lunch',
//     startDate: new Date('2021-03-22T01:00:00.000Z'),
//     endDate: new Date('2021-03-22T02:30:00.000Z'),
//   },
//   {
//     priorityId: 1,
//     typeId: 2,
//     title: '701 Meeting',
//     startDate: new Date('2021-03-22T03:30:00.000Z'),
//     endDate: new Date('2021-03-22T04:30:00.000Z'),
//   },
//   {
//     priorityId: 1,
//     typeId: 2,
//     title: '754 Meeting',
//     startDate: new Date('2021-03-22T04:30:00.000Z'),
//     endDate: new Date('2021-03-22T05:30:00.000Z'),
//   },
//   {
//     priorityId: 2,
//     typeId: 2,
//     title: 'Work',
//     startDate: new Date('2021-03-22T06:00:00.000Z'),
//     endDate: new Date('2021-03-22T08:00:00.000Z'),
//   },
// ];

// Setting ids and colours based on priority
export const priorityData = [
  {
    text: 'Low Priority',
    id: 1,
    color: '#D6ADFF',
  },
  {
    text: 'High Priority',
    id: 2,
    color: '#7A00F4',
  },
];

// Setting ids and colours based on calendar type
export const typeData = [
  {
    text: 'Home',
    id: 1,
    color: '#ADADFF',
  },
  {
    text: 'University',
    id: 2,
    color: '#0000de',
  },
];

// resources allow to differentiate between the different types of calendar options

const JournalCalendar = ({ data, date }) => {
  const [state, setState] = useState({
    calendarData: data, // data: calendarData,
    resources: [
      {
        fieldName: 'priorityId',
        title: 'Priority',
        instances: priorityData,
        allowMultiple: false,
      },
      {
        fieldName: 'typeId',
        title: 'Type',
        instances: typeData,
        allowMultiple: false,
      },
    ],
  });

  const [calendarEventName, setCalendarEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const [body, setBody] = useState({
  //   name: calendarEventName,
  //   startDate,
  //   endDate,
  // });

  function commitChanges({ added, changed, deleted }) {
    setState((newState) => {
      let { calendarData } = newState;
      if (added) {
        // const startingAddedId =
        //   calendarData.length > 0 ? calendarData[calendarData.length - 1].id + 1 : 0;
        // calendarData = [...calendarData, { id: startingAddedId, ...added }];

        const body = {
          name: calendarEventName,
          startDate,
          endDate,
        };
        axios.post('/api/calendar', body).then((res) => {
          // const startingAddedId = res.data;
          // res.data.map((appointment) => {
          //   setBody(appointment);
          //   setCalendarEventName(appointment.title);
          //   setStartDate(appointment.startDate);
          //   setEndDate(appointment.endDate);
          //   return res.data;
          // });

          setCalendarEventName(res.data.item.title);
          setStartDate(res.data.item.startDate);
          setEndDate(res.data.item.endDate);

          const startingAddedId =
            calendarData.length > 0 ? calendarData[calendarData.length - 1].id + 1 : 0;
          calendarData = [...calendarData, { id: startingAddedId, ...added }];
        });
      }
      if (changed) {
        calendarData = calendarData.forEach((appointment) => {
          axios.put(`/api/calendar/${appointment.id}`);
          return changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment;
        });
      }
      if (deleted !== undefined) {
        calendarData = calendarData.map((appointment) =>
          axios.delete(`/api/calendar/${appointment.id}`)
        );
        calendarData = calendarData.filter((appointment) => appointment.id !== deleted);
      }
      return { calendarData };
    });
  }

  return (
    <>
      <Paper className={styles.box}>
        <Scheduler className={styles.box} data={state.data}>
          <ViewState defaultCurrentDate={date} />
          <EditingState onCommitChanges={commitChanges} />
          <IntegratedEditing />
          <EditRecurrenceMenu />
          <DayView startDayHour={0} endDayHour={24} />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton showCloseButton />
          <AppointmentForm />
          <Resources data={state.resources} mainResourceName="priorityId" />
        </Scheduler>
      </Paper>
    </>
  );
};

export default JournalCalendar;
