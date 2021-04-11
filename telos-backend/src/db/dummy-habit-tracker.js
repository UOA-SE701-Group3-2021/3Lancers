import dayjs from 'dayjs';

const dummyHabitTrackers = [
  {
    name: 'Test1',
    startDate: '2021-01-01', // This is a Friday
    endDate: '2021-01-08',
    daysOfWeek: ['mon', 'tue', 'fri'],
    completedDates: ['2021-01-01'],
  },
  {
    name: 'Go gym',
    startDate: '2021-01-01', // This is a Friday
    daysOfWeek: ['mon', 'tue', 'thu'],
  },
  {
    name: 'Cry about 701',
    startDate: '2022-01-01', // This is a Saturday
    endDate: dayjs().add(100, 'year').toDate(),
    daysOfWeek: ['mon', 'tue', 'fri'],
  },
];

export default dummyHabitTrackers;
