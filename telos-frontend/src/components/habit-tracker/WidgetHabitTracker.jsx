import '../Widget.module.css';
import habitStyle from './WidgetHabitTracker.module.css';

const WidgetHabitTracker = ({ addNewHabitTracker }) => (
  <div
    onClick={addNewHabitTracker}
    className={`${habitStyle.widgetIcon} ${habitStyle.widgetHabitTracker}`}
  >
    <div className={`${habitStyle.circle} ${habitStyle.filled}`} />
    <div className={habitStyle.circle} />
    <div className={habitStyle.circle} />
  </div>
);

export default WidgetHabitTracker;
