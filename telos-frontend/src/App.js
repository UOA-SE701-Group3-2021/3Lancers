import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Journal from './views/journal/Journal';
import WidgetCalendar from './components/calendar/WidgetCalendar';
import WidgetTodo from './components/todo/WidgetTodo';
import WidgetDrawer from './components/widget-drawer/WidgetDrawer';
import WidgetHabitTracker from './components/habit-tracker/WidgetHabitTracker';

import CalendarDashboard from './components/calendar/DashboardCalendar';
import CalendarJournal from './components/calendar/JournalCalendar';
import DashboardHabitTracker from './components/habit-tracker/DashboardHabitTracker';
import JournalHabitTracker from './components/habit-tracker/JournalHabitTracker';
import DashboardTodo from './components/todo/DashboardTodo';
import JournalTodo from './components/todo/JournalTodo';
import TopBar from './components/top-bar/TopBar';
import JournalText from './components/text/JournalText';

function App() {
  return (
    <Router>
      <Switch>
        {/* links for easy testing of components */}
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
        <Route path="/test/text">
          <JournalText />
        </Route>
        <Route path="/widget-drawer">
          <div className="app-container">
            <WidgetDrawer>
              <WidgetCalendar />
              <WidgetTodo />
              <WidgetHabitTracker />
            </WidgetDrawer>
          </div>
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
