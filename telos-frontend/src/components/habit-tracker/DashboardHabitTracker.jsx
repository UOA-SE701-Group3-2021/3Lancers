import { useState } from 'react';
import habitStyle from './HabitTracker.module.css';
import HabitTracker from './HabitTrackerCard';

// This react component draws a Material-UI Habit Tracker in Journal View for the user to note their habituals
const DashboardHabitTracker = () => {
  const [habitTrackers, setHabitTrackers] = useState([
    {
      title: 'Habit 1',
      des: 'Habit description, Do Task X, Y many times per week',
      weeks: '1',
      startDate: '2021-01-01',
      endType: 'Never',
      endDate: '',
    },
  ]);

  // Main window of the widgets
  return (
    <div className={habitStyle.BackgroundImage}>
      {habitTrackers.map((e) => (
        <HabitTracker habit={e} newHabit={setHabitTrackers} habits={habitTrackers} />
      ))}
    </div>
  );
};

export default DashboardHabitTracker;
