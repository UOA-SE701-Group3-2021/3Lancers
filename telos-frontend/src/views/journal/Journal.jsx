import { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import DatePicker from 'react-datepicker';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DraggableWidget from '../../dnd/DraggableWidget';
import { WidgetTypes } from '../../dnd/WidgetTypes';
import Page from './Page';
import './Journal.css';
import 'react-datepicker/dist/react-datepicker.css';

const Journal = () => {
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const DAYS_TO_CHANGE_BY = 1;
  const date = new Date();
  const [dateLeftPage, setDateLeftPage] = useState(date.getTime());
  const [dateRightPage, setDateRightPage] = useState(
    date.getTime() + DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY
  );

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

  const [widgets, setWidgets] = useState([
    { widgetType: 'todo', id: 0, top: 200, left: 200 },
    { widgetType: 'habit_tracker', id: 1, top: 300, left: 300 },
  ]);

  const moveWidget = useCallback(
    (id, left, top) => {
      setWidgets(
        update(widgets, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [widgets]
  );

  const [, drop] = useDrop(
    () => ({
      accept: [
        WidgetTypes.TODO_LIST,
        WidgetTypes.CALENDAR,
        WidgetTypes.HABIT_TRACKER,
        WidgetTypes.TEXT,
      ],
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();

        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);

        moveWidget(item.id, left, top);
        return undefined;
      },
    }),
    [moveWidget]
  );

  return (
    <div className="Journal" ref={drop}>
      {widgets.map((widget) => (
        <DraggableWidget {...widget} />
      ))}
      <div className="Half-journal">
        <ArrowBackIcon className="Arrow-left" onClick={handleLeftNav} />
        <DatePicker
          selected={dateLeftPage}
          onChange={(selectedDate) => handleLeftDatePick(selectedDate)}
          dateFormat="MMMM d, yyyy"
          className="Date-select"
        />
        <Page newDate={dateLeftPage} className="Page" />
      </div>
      <div className="Half-journal">
        <DatePicker
          selected={dateRightPage}
          onChange={(selectedDate) => handleRightDatePick(selectedDate)}
          dateFormat="MMMM d, yyyy"
          className="Date-select"
        />
        <Page newDate={dateRightPage} className="Page" />
        <ArrowForwardIcon className="Arrow-right" onClick={handleRightNav} />
      </div>
    </div>
  );
};

export default Journal;
