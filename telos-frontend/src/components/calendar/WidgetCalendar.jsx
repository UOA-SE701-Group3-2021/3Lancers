import '../Widget.css';
import './WidgetCalendar.css';
import moment from 'moment';

const WidgetTodo = () => {
  const today = moment();
  const thisMonth = today.format('MMMM');
  const thisDay = today.format('DD');
  return (
    <div className="widget-icon vertical">
      <div className="small-month">{thisMonth}</div>
      <div className="big-number">{thisDay}</div>
    </div>
  );
};

export default WidgetTodo;
