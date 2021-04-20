import { WidgetTypes } from './WidgetTypes';
import JournalCalendar from '../components/calendar/JournalCalendar';
import JournalHabitTracker from '../components/habit-tracker/JournalHabitTracker';
import JournalTodo from '../components/todo/JournalTodo';
import JournalText from '../components/text/JournalText';
import Clock from '../components/clock/Clock';
import JournalYoutubePlayer from '../components/youtube-player/JournalYoutubePlayer';
import JournalWeather from '../components/weather/JournalWeather';
import Steam from '../components/steam/steam';

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
          <JournalText date={date} data={data} id={id} deleteWidget={deleteWidget} />
        </div>
      );
    case WidgetTypes.CLOCK:
      return (
        <div style={{ height: 20, width: 200 }}>
          <Clock date={date} data={data} id={id} deleteWidget={deleteWidget} />
        </div>
      );
    case WidgetTypes.YOUTUBE_PLAYER:
      return <JournalYoutubePlayer date={date} data={data} id={id} deleteWidget={deleteWidget} />;
    case WidgetTypes.WEATHER:
      return <JournalWeather date={date} data={data} id={id} deleteWidget={deleteWidget} />;
    case WidgetTypes.STEAM:
      return (
        <div style={{ height: 'auto', width: 700 }}>
          <Steam date={date} data={data} id={id} deleteWidget={deleteWidget} />
        </div>
      );
    default:
      return null;
  }
};
