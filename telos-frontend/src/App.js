import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Journal from './views/journal/Journal';
import CalendarDashboard from './components/calendar/DashboardCalendar';
import CalendarJournal from './components/calendar/JournalCalendar';
import DashboardHabitTracker from './components/habit-tracker/DashboardHabitTracker';
import JournalHabitTracker from './components/habit-tracker/JournalHabitTracker';
import DashboardTodo from './components/todo/DashboardTodo';
import JournalTodo from './components/todo/JournalTodo';
import TopBar from './components/top-bar/TopBar';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/test/dashboard/calendar">
          <CalendarDashboard />
        </Route>
        <Route path="/test/journal/calendar">
          <CalendarJournal />
        </Route>
        <Route path="/test/dashboard/habittracker">
          <DashboardHabitTracker />
        </Route>
        <Route path="/test/journal/habittracker">
          <JournalHabitTracker />
        </Route>
        <Route path="/test/dashboard/todo">
          <DashboardTodo />
        </Route>
        <Route path="/test/journal/todo">
          <JournalTodo />
        </Route>
        <Route path="/test/topbar">
          <TopBar />
        </Route>
        <Route path="*">
          <div className="App" data-testid="test">
            <div className="Journal-view">
              <Journal />
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
