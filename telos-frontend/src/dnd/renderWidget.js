import { FaTimes as Delete } from 'react-icons/fa';
import { WidgetTypes } from './WidgetTypes';
import JournalCalendar from '../components/calendar/JournalCalendar';
import JournalHabitTracker from '../components/habit-tracker/JournalHabitTracker';
import JournalTodo from '../components/todo/JournalTodo';
import JournalText from '../components/text/JournalText';
import JournalYoutubePlayer from '../components/youtube-player/JournalYoutubePlayer';
import styles from './renderWidget.module.css';

const renderWidget = (widgetType, { data, date, id, deleteWidget }) => {
  const widget = (type) => {
    switch (type) {
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
          <div style={{ height: 300, width: 200 }}>
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

  return (
    <>
      <div className={styles.header}>
        {' '}
        <Delete className={styles.cross} onClick={() => deleteWidget(id)} />
      </div>
      {widget(widgetType)}
    </>
  );
};

export default renderWidget;
