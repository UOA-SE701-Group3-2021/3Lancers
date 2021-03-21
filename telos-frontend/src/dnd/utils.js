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
      return (
        <div style={{ height: 400, maxWidth: 350 }}>
          <JournalCalendar {...props} />
        </div>
      );
    case WidgetTypes.HABIT_TRACKER:
      return <JournalHabitTracker {...props} />;
    case WidgetTypes.TEXT:
      return (
        <div style={{ height: 300, width: 250 }}>
          <JournalText {...props} />
        </div>
      );
    default:
      return null;
  }
};
