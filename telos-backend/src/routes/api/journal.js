const express = require('express');
const mongoose = require('mongoose')
const CalendarEvent = require('../../models/calendar_event');
const Habit = require('../../models/habit');
const Text = require('../../models/text');
const TodoTask = require('../../models/todo_task');
const Widget = require('../../models/widget');

const router = express.Router();

// Helper methods ---------------------------------
// Return a string representation of current day. 
// See daysOfWeekenum in src/models/habit.js
function getStringDayOfWeek(dayNum) {
  let dayString;
  switch (dayNum) {
    case 0:
      dayString = 'sun';
      break;
    case 1:
      dayString = 'mon';
      break;
    case 2:
      dayString = 'tue';
      break;
    case 3:
      dayString = 'wed';
      break;
    case 4:
      dayString = 'thu';
      break;
    case 5:
      dayString = 'fri';
      break;
    case 6:
      dayString = 'sat';
      break;
    default:
      dayString = 'err';
  }
  return dayString;
}

async function getTodosForDay(date){
  // Todos should return either what is made today, or all overdue tasks.
  //console.log("In todos")
  //console.log(date)
  const todos = await TodoTask.find({
    $or:[
      { createdDate: { $gte: date + 'T00:00:00', $lte: date + 'T23:59:59' } },
      { dueDate: {$gte: date + 'T00:00:00', $lte: date + 'T23:59:59' } },
      { dueDate: {$lt: date + 'T00:00:00'}, completed: false}
    ] 
  });
  return todos;
}

// Param: date, of type date, parsed from url path param. Given as yyyy-mm-dd
async function getHabitsForDay(date){
  // Create habit objects to return. These are not stored directly (since technically could be unlimited)
  // Must find all habits that are between the requested day, but before end date, then check if they fall
  // on the current day.
  //console.log(date)
  const habits = await Habit.find({
    startDate: {$lte: date + 'T23:59:59'}, 
    endDate: {$gte: date + 'T00:00:00'},
  }); //endDate: {$lte: date + 'T23:59:59'} 
  //{startDate: {$lte: new Date('2000-01-01T00:00:00Z')}}
  //console.log(habits);
  // Habit objects returned in array as following:
  // {
  //    name: String
  //    done: Boolean
  // }
  // Note: The Date.getDay() method returns an integer for day of week: 0 for sunday, 1 for monday etc.
  const day = new Date(date).getDay();
  const dayOfWeek = getStringDayOfWeek(day);
  const habitDataToSend = [];
  for (var i = 0; i < habits.length; i++) {
    // Check if habit falls on day of week.
    //console.log(new Date(date))
    const compDates = habits[i].completedDates;

    // We must cast to string because the compDates array has Strings in it! 
    // (try console.log this value without it)
    const completedValue = compDates.includes(String(new Date(date)))
    if (habits[i].daysOfWeek.includes(dayOfWeek)){ 
      habitDataToSend.push({
        _id: habits[i]._id,
        date: date,
        name: habits[i].name,
        completed: completedValue
      })
    }
  }
  return habitDataToSend;
}

async function getCalendarDataForDay(date) {
  const calendarevents = await CalendarEvent.find({ startTime: {
    $gte: date + 'T00:00:00', 
    $lte: date + 'T23:59:59'
  }});
  return calendarevents;
}
// ------------------------------------
// Endpoints defined from this point on 

// get widgets which appear in the journal for a single date.
// params:
// 'date': journal date to get widgets for
router.get('/:date', async (req, res) => {
  const { date } = req.params;
  //2021-01-01
  // Need to get all the data from widgets on that date.
  // Then go through each of components, if exist, and get the data.
  const widgets = await Widget.find({ date: date });

  // Must find all text widgets based on the widget Ids retrieved.
  const textWidgetIds = []
  for (var i = 0; i < widgets.length; i++) {
    if (widgets[i].type === 'text'){
      textWidgetIds.push(widgets[i]._id);
    }
  }

  const texts = await Text.find({ widgetId: { $in: textWidgetIds }});
  const calendarData = await getCalendarDataForDay(date);
  const habitData = await getHabitsForDay(date);
  const todoData = await getTodosForDay(date);

  res.json({
    widgetData: widgets,
    calendarData: calendarData,
    habitData: habitData,
    textData: texts,
    todoData: todoData,
  });
});

// create widget in journal (widget data must be created separately)
// request body:
// 'date': date to insert widget into
// 'position': position of widget in journal for the specified date
// 'widget': type of widget i.e. 'calendar', etc.
router.post('/', async (req, res) => {
  const date = req.body.date
  const newWidget = new Widget({
    date: date,
    position: {
      row: req.body.position.row,
      col: req.body.position.col
    },
    type: req.body.type,
  });
  newWidget.save(async (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    let error;
    let data;
    const type = req.body.type;
    switch(type){
      case 'calendar':
        data = await getCalendarDataForDay(date);
        break
      case 'todo':
        data = await getTodosForDay(date);
        break
      case 'habit_tracker':
        data = await getHabitsForDay(date);
        break
      case 'text':
        const newText = new Text({
          text: '',
          widgetId: newWidget._id,
        });
        await newText.save((err) => {
          if (err) {
            error = err;
          }
        });
        data = [newText];
        break
    }
    if (error) {
      return res.status(400).json({ error: error });
    }
    return res.status(201).json({
      widget: newWidget,
      data: data,
    });
  });
});
  
// update widget in journal (e.g. change date, change position)
// request body:
// 'date': date to insert widget into
// 'position': position of widget in journal for the specified date
router.put('/:id', (req, res) => {
  const query = { _id: req.params.id };

  Widget.findOneAndUpdate(query, req.body, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.sendStatus(204);
  });
});

// delete widget in journal page (but not any associated data)
// TODO: delete text widget with it.
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Widget.deleteOne({ _id: id }, (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.sendStatus(204);
  });
});

module.exports = router;