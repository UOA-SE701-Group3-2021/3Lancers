import { WidgetTypes } from './WidgetTypes';
import JournalCalendar from '../components/calendar/JournalCalendar';
import JournalHabitTracker from '../components/habit-tracker/JournalHabitTracker';
import JournalTodo from '../components/todo/JournalTodo';
import JournalText from '../components/text/JournalText';

export const renderWidget = (widgetType, props) => {
  switch (widgetType) {
    case WidgetTypes.TODO_LIST:
      return <JournalTodo {...props} />;
    case WidgetTypes.CALENDAR:
      return <JournalCalendar {...props} />;
    case WidgetTypes.HABIT_TRACKER:
      return <JournalHabitTracker {...props} />;
    case WidgetTypes.TEXT:
      return <JournalText {...props} />;
    default:
      return null;
  }
};
