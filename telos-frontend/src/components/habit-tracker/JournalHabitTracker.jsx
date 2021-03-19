import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import './JournalHabitTracker.css';

const JournalHabitTracker = () => (
  <div className="container">
    <div className="HabitualsTitle">
      <h2 align="middle">Habituals</h2>
      <span className="AddIcon">
        <IconButton>
          <AddIcon />
        </IconButton>
      </span>
    </div>
    <div className="Habituals">
      <ul>
        <div>
          <li>H1</li>
          <p>Habit Name</p>
        </div>
        <div>
          <li>H2</li>
          <p>Habit Name</p>
        </div>
        <div>
          <li>H3</li>
          <p>Habit Name</p>
        </div>
      </ul>
    </div>
  </div>
);

export default JournalHabitTracker;
