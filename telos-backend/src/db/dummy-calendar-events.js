import dayjs from 'dayjs';

const dummyCalendarEvents = [
  {
    name: 'Work on 701',
    startTime: dayjs().toDate(), // Current Time and Date
    endTime: dayjs().add(2, 'hour').toDate(),
  },
  {
    name: 'Swimming',
    startTime: dayjs().add(1, 'day').toDate(), // Current time but tomorrow
    endTime: dayjs().add(1, 'day').add(1, 'hour').toDate(), // Current time + 1 hour but tomorrow
  },
  {
    name: 'party',
    startTime: dayjs().subtract(1, 'day').toDate(),
    endTime: dayjs().subtract(1, 'day').add(3, 'hour').toDate(),
  },
];

export default dummyCalendarEvents;
