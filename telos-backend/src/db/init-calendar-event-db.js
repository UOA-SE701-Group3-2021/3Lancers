import dayjs from 'dayjs';

console.log(dayjs().toDate());
console.log(dayjs().subtract(1, 'day').add(3, 'hour').toDate());
