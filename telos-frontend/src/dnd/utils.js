import { WidgetTypes } from './WidgetTypes';
import JournalCalendar from '../components/calendar/JournalCalendar';
import JournalHabitTracker from '../components/habit-tracker/JournalHabitTracker';
import JournalTodo from '../components/todo/JournalTodo';
import JournalText from '../components/text/JournalText';
import Clock from '../components/clock/Clock';
import JournalYoutubePlayer from '../components/youtube-player/JournalYoutubePlayer';
import JournalWeather from '../components/weather/JournalWeather';
import style from './utils.module.css';

export const renderWidget = (widgetType, { data, date, id, deleteWidget }) => {
  switch (widgetType) {
    case WidgetTypes.TODO_LIST:
      return <JournalTodo data={data} date={date} id={id} deleteWidget={deleteWidget} />;
    case WidgetTypes.CALENDAR:
      return (
        <div className={style.calendar}>
          <JournalCalendar data={data} date={date} id={id} deleteWidget={deleteWidget} />
        </div>
      );
    case WidgetTypes.HABIT_TRACKER:
      return <JournalHabitTracker data={data} date={date} id={id} deleteWidget={deleteWidget} />;
    case WidgetTypes.TEXT:
      return (
        <div className={style.text}>
          <JournalText date={date} data={data} id={id} deleteWidget={deleteWidget} />
        </div>
      );
    case WidgetTypes.CLOCK:
      return (
        <div className={style.clock}>
          <Clock date={date} data={data} id={id} deleteWidget={deleteWidget} />
        </div>
      );
    case WidgetTypes.YOUTUBE_PLAYER:
      return <JournalYoutubePlayer date={date} data={data} id={id} deleteWidget={deleteWidget} />;
    case WidgetTypes.WEATHER:
      return <JournalWeather date={date} data={data} id={id} deleteWidget={deleteWidget} />;
    default:
      return null;
  }
};
