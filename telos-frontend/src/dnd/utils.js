import { WidgetTypes } from './WidgetTypes';
import JournalCalendar from '../components/calendar/JournalCalendar';
import JournalHabitTracker from '../components/habit-tracker/JournalHabitTracker';
import JournalTodo from '../components/todo/JournalTodo';
import JournalText from '../components/text/JournalText';

export const renderWidget = (widgetType, { data, date, id, deleteWidget }) => {
  switch (widgetType) {
    case WidgetTypes.TODO_LIST:
      return <JournalTodo data={data} date={date} id={id} deleteWidget={deleteWidget} />;
    case WidgetTypes.CALENDAR:
      return (
        <div style={{ height: 400, maxWidth: 350 }}>
          <JournalCalendar data={data} date={date} id={id} deleteWidget={deleteWidget} />
        </div>
      );
    case WidgetTypes.HABIT_TRACKER:
      return <JournalHabitTracker data={data} date={date} id={id} deleteWidget={deleteWidget} />;
    case WidgetTypes.TEXT:
      return (
        <div style={{ height: 300, width: 250 }}>
          <JournalText data={data} id={id} deleteWidget={deleteWidget} />
        </div>
      );
    default:
      return null;
  }
};
