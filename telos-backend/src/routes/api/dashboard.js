// const express = require('express');
const express = require('express');

const router = express.Router();

// get widgets which appear on the dashboard for a date range.
// query params:
// 'widget': type of widget i.e. 'calendar', etc.
// 'startDate': start date
// 'endDate': end date
router.get('/:widget', (req, res) => {
  res.json({
    endpoint: '/dashboard',
    request: `GET widget type: ${req.params.widget}, start: ${req.query.startDate}, end: ${req.query.endDate}`,
  });
});

module.exports = router;
// const router = express.Router();
// const CalendarEvent = require('../../models/calendar_event');
// const Habit = require('../../models/habit');
// const Text = require('../../models/text');
// const TodoTask = require('../../models/todo_task');
// const Widget = require('../../models/widget');

// // get widgets which appear on the dashboard for a date range.
// // query params:
// // 'widget': type of widget i.e. 'calendar', etc.
// // 'startDate': start date
// // 'endDate': end date
// // router.get('/:widget', (req, res) => {
// //   res.json({
// //     endpoint: '/dashboard',
// //     request: `GET widget type: ${req.params.widget}, start: ${req.query.startDate}, end: ${req.query.endDate}`,
// //   });
// // });
// function getEndDate(startingDate) {
//   let dayString;
//   const year = startingDate.getFullYear();
//   const month = startingDate.getMonth();
//   let day = startingDate.getDate();
//   if (year % 4 === 0) {
//     day = 29;
//   } else {
//     day = 28;
//   }
//   switch (month) {
//     case 0:
//       dayString = new Date(year, month, 31, 23, 59, 59);
//       break;
//     case 1:
//       dayString = new Date(year, month, day, 23, 59, 59);
//       break;
//     case 2:
//       dayString = new Date(year, month, 31, 23, 59, 59);
//       break;
//     case 3:
//       dayString = new Date(year, month, 30, 23, 59, 59);
//       break;
//     case 4:
//       dayString = new Date(year, month, 31, 23, 59, 59);
//       break;
//     case 5:
//       dayString = new Date(year, month, 30, 23, 59, 59);
//       break;
//     case 6:
//       dayString = new Date(year, month, 31, 23, 59, 59);
//       break;
//     case 7:
//       dayString = new Date(year, month, 31, 23, 59, 59);
//       break;
//     case 8:
//       dayString = new Date(year, month, 30, 23, 59, 59);
//       break;
//     case 9:
//       dayString = new Date(year, month, 31, 23, 59, 59);
//       break;
//     case 10:
//       dayString = new Date(year, month, 30, 23, 59, 59);
//       break;
//     case 11:
//       dayString = new Date(year, month, 31, 23, 59, 59);
//       break;
//     default:
//       dayString = 'err';
//   }
//   return dayString;
// }

// async function getTodosForMonth(date) {
//   // Todos should return either what is made whin a month, or all overdue tasks.
//   const startdate = date;
//   startdate.setDate(1);
//   const enddate = getEndDate(date);
//   const startTime = 'T00:00:00';
//   const endTime = 'T23:59:59';
//   const todos = await TodoTask.find({
//     $or: [
//       { createdDate: { $gte: startdate + startTime, $lte: enddate + endTime } },
//       { dueDate: { $gte: startdate + startTime, $lte: enddate + endTime } },
//       { dueDate: { $lt: enddate + startTime }, completed: false },
//     ],
//   });

//   // add new isOverdue field for frontend to easily display overdue tasks differently
//   const objTodos = [];
//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < todos.length; i++) {
//     objTodos.push(todos[i].toObject());
//     if (todos[i].completed === false) {
//       objTodos[i].isOverdue = true;
//     } else {
//       objTodos[i].isOverdue = false;
//     }
//   }

//   return objTodos;
// }

// function getStringDayOfWeek(dayNum) {
//   let dayString;
//   switch (dayNum) {
//     case 0:
//       dayString = 'sun';
//       break;
//     case 1:
//       dayString = 'mon';
//       break;
//     case 2:
//       dayString = 'tue';
//       break;
//     case 3:
//       dayString = 'wed';
//       break;
//     case 4:
//       dayString = 'thu';
//       break;
//     case 5:
//       dayString = 'fri';
//       break;
//     case 6:
//       dayString = 'sat';
//       break;
//     default:
//       dayString = 'err';
//   }
//   return dayString;
// }

// // Param: date, of type date, parsed from url path param. Given as yyyy-mm-dd
// async function getHabitsForMonth(date) {
//   // Create habit objects to return. These are not stored directly (since technically could be unlimited)
//   // Must find all habits that are between the requested days, but before end date, then check if they fall
//   // on the current day.
//   const startdate = date;
//   startdate.setDate(1);
//   const enddate = getEndDate(date);
//   const startTime = 'T00:00:00';
//   const endTime = 'T23:59:59';
//   const habits = await Habit.find({
//     startDate: { $lte: startdate + endTime },
//     endDate: { $gte: enddate + startTime },
//   });
//   // Habit objects returned in array as following:
//   // {
//   //    name: String
//   //    done: Boolean
//   // }
//   // Note: The Date.getDay() method returns an integer for day of week: 0 for sunday, 1 for monday etc.
//   const day = new Date(date).getDay();
//   const dayOfWeek = getStringDayOfWeek(day);
//   const habitDataToSend = [];
//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < habits.length; i++) {
//     // Check if habit falls on day of week.
//     const compDates = habits[i].completedDates;

//     // We must cast to string because the compDates array has Strings in it!
//     // (try console.log this value without it)
//     const completedValue = compDates.includes(String(new Date(date)));
//     if (habits[i].daysOfWeek.includes(dayOfWeek)) {
//       habitDataToSend.push({
//         _id: habits[i]._id,
//         // eslint-disable-next-line object-shorthand
//         date: date,
//         name: habits[i].name,
//         completed: completedValue,
//       });
//     }
//   }
//   return habitDataToSend;
// }

// async function getCalendarDataForMonth(date) {
//   const startdate = date;
//   startdate.setDate(1);
//   const enddate = getEndDate(date);
//   const startTime = 'T00:00:00';
//   const endTime = 'T23:59:59';
//   const calendarevents = await CalendarEvent.find({
//     startTime: {
//       $gte: startdate + startTime,
//       $lte: enddate + endTime,
//     },
//   });
//   return calendarevents;
// }

// // Endpoints defined from this point on

// // get widgets which appear in the journal for a single date.
// // params:
// // 'widget': specific widget
// router.get('/:widget', async (req, res) => {
//   const { widget } = req.params;

//   const date = await Widget.find({ type: widget });
//   const textWidgetIds = [];
//   // eslint-disable-next-line no-plusplus
//   for (let i = 0; i < date.length; i++) {
//     if (date[i].type === 'text') {
//       textWidgetIds.push(date[i]._id);
//     }
//   }
//   let returnData = '';
//   switch (widget) {
//     case 'calendar':
//       returnData = await getCalendarDataForMonth(date);
//       break;
//     case 'todo':
//       returnData = await getTodosForMonth(date);
//       break;
//     case 'habit_tracker':
//       returnData = await getHabitsForMonth(date);
//       break;
//     case 'text':
//       returnData = await Text.find({ widgetId: { $in: date } });
//       break;
//     default:
//       returnData = 'err';
//   }

//   const start = await getCalendarDataForMonth(date);
//   const end = await getHabitsForMonth(date);

//   res.status(200).json({
//     widgetType: widget,
//     widgetData: returnData,
//     startDate: start,
//     endDate: end,
//   });
// });

// module.exports = router;
