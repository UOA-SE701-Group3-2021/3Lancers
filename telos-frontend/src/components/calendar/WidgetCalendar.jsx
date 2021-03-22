/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import moment from 'moment';
import { useState } from 'react';
import widgetStyles from '../Widget.module.css';
import calendarWidgetStyles from './WidgetCalendar.module.css';

const WidgetTodo = ({ addNewCalendar}) => {
  const today = moment();
  const thisMonth = today.format('MMMM');
  const thisDay = today.format('DD');

  // const [clickTimeout, setClickTimeout] = useState(null);

  // const handleClicks = () => {
  //   if (clickTimeout !== null) {
  //     console.log('double click executes');
  //     addNewCalendarRight();
  //     clearTimeout(clickTimeout);
  //     setClickTimeout(null);
  //   } else {
  //     console.log('single click');
  //     setClickTimeout(
  //       setTimeout(() => {
  //         console.log('first click executes ');
  //         addNewCalendarLeft();
  //         clearTimeout(clickTimeout);
  //         setClickTimeout(null);
  //       }, 2000)
  //     );
  //   }
  // };

  return (
    <div
      onClick={addNewCalendar}
      className={`${widgetStyles.widgetIcon} ${widgetStyles.vertical}`}
    >
      <div className={calendarWidgetStyles.smallMonth}>{thisMonth}</div>
      <div className={widgetStyles.bigText}>{thisDay}</div>
    </div>
  );
};

export default WidgetTodo;
