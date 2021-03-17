import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import './DashboardHabitTracker.css';

const DashboardHabitTracker = () => (
  <div className="container">
    <div className="HabitTitle">
      <h2>hello world</h2>
      <span className="AddIcon">
        <IconButton>
          <AddIcon />
        </IconButton>
      </span>
    </div>
    <div className="HabitContent">
      <p>Habit description, Do Task X, Y many times per week</p>
    </div>
    <div className="WeekSchedule">
      <ul>
        <li>M</li>
        <li>T</li>
        <li>W</li>
        <li>T</li>
        <li>F</li>
        <li>S</li>
        <li>S</li>
      </ul>
    </div>
  </div>
);

export default DashboardHabitTracker;
