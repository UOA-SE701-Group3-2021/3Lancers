import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
  },
  {
    id: 23,
    title: 'Go to the gym 💪',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 5)),
  },
];

const DashboardCalendar = () => (
  <div>
    <Calendar
      selectable
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: window.screen.height - 110, width: '100%' }}
    />
  </div>
);

export default DashboardCalendar;
