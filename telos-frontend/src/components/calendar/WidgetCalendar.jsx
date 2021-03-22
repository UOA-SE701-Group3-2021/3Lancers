import moment from 'moment';
import widgetStyles from '../Widget.module.css';
import calendarWidgetStyles from './WidgetCalendar.module.css';

const WidgetTodo = ({ addNewCalendar }) => {
  const today = moment();
  const thisMonth = today.format('MMMM');
  const thisDay = today.format('DD');
  return (
    <div onClick={addNewCalendar} className={`${widgetStyles.widgetIcon} ${widgetStyles.vertical}`}>
      <div className={calendarWidgetStyles.smallMonth}>{thisMonth}</div>
      <div className={widgetStyles.bigText}>{thisDay}</div>
    </div>
  );
};

export default WidgetTodo;
