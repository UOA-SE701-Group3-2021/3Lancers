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
      <div className="App" data-testid="test">
        <TopBar />

        <Switch>
          <Route path="/calendar">
            <CalendarDashboard />
          </Route>
          <Route path="/habittracker">
            <DashboardHabitTracker />
          </Route>
          <Route path="/todo">
            <DashboardTodo />
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
          {/* links for easy testing of components */}
          <Route path="/test/journal/calendar">
            <CalendarJournal />
          </Route>
          <Route path="/test/journal/habittracker">
            <JournalHabitTracker />
          </Route>
          <Route path="/test/journal/todo">
            <JournalTodo />
          </Route>
          <Route path="/test/text">
            <JournalText />
          </Route>
          <Route path="*">
            <div className="Journal-view">
              <Journal />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
