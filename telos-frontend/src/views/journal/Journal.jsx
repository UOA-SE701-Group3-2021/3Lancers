/* eslint-disable no-unused-vars */
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Page from './Page';
import journalStyles from './Journal.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import WidgetDrawer from '../../components/widget-drawer/WidgetDrawer';
import WidgetCalendar from '../../components/calendar/WidgetCalendar';
import WidgetText from '../../components/text/WidgetText';
import WidgetTodo from '../../components/todo/WidgetTodo';
import WidgetHabitTracker from '../../components/habit-tracker/WidgetHabitTracker';

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const DAYS_TO_CHANGE_BY = 1;

const Journal = () => {
  const now = new Date();
  const [dateLeftPage, setDateLeftPage] = useState(now.getTime());
  const [dateRightPage, setDateRightPage] = useState(
    now.getTime() + DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY
  );
  const [activeWidgetsLeft, setActiveWidgetsLeft] = useState([
    { widgetType: 'todo', top: 0, left: 0 },
    { widgetType: 'habit_tracker', top: 200, left: 200 },
  ]);
  const [activeWidgetsRight, setActiveWidgetsRight] = useState([]);

  function handleLeftNav() {
    setDateLeftPage(dateLeftPage - DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
    setDateRightPage(dateRightPage - DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
  }

  function handleRightNav() {
    setDateLeftPage(dateLeftPage + DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
    setDateRightPage(dateRightPage + DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
  }

  function handleLeftDatePick(selectedDate) {
    setDateLeftPage(selectedDate.getTime());
    setDateRightPage(selectedDate.getTime() + DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
  }

  function handleRightDatePick(selectedDate) {
    setDateRightPage(selectedDate.getTime());
    setDateLeftPage(selectedDate.getTime() - DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
  }

  function formatDateString(dateMilliseconds) {
    const date = new Date(dateMilliseconds);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
      }}
    >
      <div
        style={{
          marginRight: 5,
        }}
      >
        <WidgetDrawer>
          <WidgetCalendar
            addNewCalendarLeft={() => {
              setActiveWidgetsLeft([
                ...activeWidgetsLeft,
                { widgetType: 'calendar', top: 0, left: 0 },
              ]);
            }}
            addNewCalendarRight={() => {
              setActiveWidgetsRight([
                ...activeWidgetsRight,
                { widgetType: 'calendar', top: 0, left: 0 },
              ]);
            }}
          />
          <WidgetTodo />
          <WidgetHabitTracker />
          <WidgetText />
        </WidgetDrawer>
      </div>
      <div className={journalStyles.Journal}>
        <div className={journalStyles.HalfJournal}>
          <ArrowBackIcon className={journalStyles.ArrowLeft} onClick={handleLeftNav} />
          <DatePicker
            selected={dateLeftPage}
            onChange={(selectedDate) => handleLeftDatePick(selectedDate)}
            dateFormat="MMMM d, yyyy"
            className={journalStyles.DateSelect}
          />
          <Page
            date={formatDateString(dateLeftPage)}
            leftPage
            activeWidgets={activeWidgetsLeft}
            setActiveWidgets={setActiveWidgetsLeft}
          />
        </div>
        <div className={journalStyles.HalfJournal}>
          <DatePicker
            selected={dateRightPage}
            onChange={(selectedDate) => handleRightDatePick(selectedDate)}
            dateFormat="MMMM d, yyyy"
            className={journalStyles.DateSelect}
          />
          <Page
            date={formatDateString(dateRightPage)}
            activeWidgets={activeWidgetsRight}
            setActiveWidgets={setActiveWidgetsRight}
          />
          <ArrowForwardIcon className={journalStyles.ArrowRight} onClick={handleRightNav} />
        </div>
      </div>
    </div>
  );
};

export default Journal;
