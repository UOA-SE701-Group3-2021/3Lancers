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

  // widgets active on the left page
  const [activeWidgetsLeft, setActiveWidgetsLeft] = useState([]);
  // widgets active on the right page
  const [activeWidgetsRight, setActiveWidgetsRight] = useState([]);
  // widget will be added on the right page if isRight is true
  const [isRight, setIsRight] = useState(true);

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

  const addNewWidget = (widgetName) => {
    if (isRight) {
      setActiveWidgetsRight([...activeWidgetsRight, { widgetType: widgetName, top: 0, left: 0 }]);
    } else {
      setActiveWidgetsLeft([...activeWidgetsLeft, { widgetType: widgetName, top: 0, left: 0 }]);
    }
  };

  return (
    <div className={journalStyles.JournalContainer}>
      <div className={journalStyles.WidgetDrawerContainer}>
        <WidgetDrawer
          isRight={isRight}
          toggleIsRight={() => {
            setIsRight(!isRight);
          }}
        >
          <WidgetCalendar
            addNewCalendar={() => {
              addNewWidget('calendar');
            }}
          />
          <WidgetTodo
            addNewTodo={() => {
              addNewWidget('todo');
            }}
          />
          <WidgetHabitTracker
            addNewHabitTracker={() => {
              addNewWidget('habit_tracker');
            }}
          />
          <WidgetText
            addNewText={() => {
              addNewWidget('text');
            }}
          />
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
