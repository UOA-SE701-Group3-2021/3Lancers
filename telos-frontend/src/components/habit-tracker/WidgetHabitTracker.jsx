import '../Widget.module.css';
import habitStyle from './WidgetHabitTracker.module.css';

const WidgetHabitTracker = () => (
  <div className={`${habitStyle.widgetIcon} ${habitStyle.widgetHabitTracker}`}>
    <div className={`${habitStyle.circle} ${habitStyle.filled}`} />
    <div className={habitStyle.circle} />
    <div className={habitStyle.circle} />
  </div>
);

export default WidgetHabitTracker;
