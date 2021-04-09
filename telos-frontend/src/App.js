import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Journal from './views/journal/Journal';
import WidgetCalendar from './components/calendar/WidgetCalendar';
import WidgetText from './components/text/WidgetText';
import WidgetTodo from './components/todo/WidgetTodo';
import WidgetDrawer from './components/widget-drawer/WidgetDrawer';
import WidgetHabitTracker from './components/habit-tracker/WidgetHabitTracker';
import WidgetYoutubePlayer from './components/youtube-player/WidgetYoutubePlayer';

import CalendarDashboard from './components/calendar/DashboardCalendar';
import CalendarJournal from './components/calendar/JournalCalendar';
import DashboardHabitTracker from './components/habit-tracker/DashboardHabitTracker';
import JournalHabitTracker from './components/habit-tracker/JournalHabitTracker';
import DashboardTodo from './components/todo/DashboardTodo';
import JournalTodo from './components/todo/JournalTodo';
import TopBar from './components/top-bar/TopBar';
import JournalText from './components/text/JournalText';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.App} data-testid="test">
        <TopBar />

        <div style={{ flex: 1 }}>
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
              <div className={styles.appContainer}>
                <WidgetDrawer>
                  <WidgetCalendar />
                  <WidgetTodo />
                  <WidgetHabitTracker />
                  <WidgetText />
                  <WidgetYoutubePlayer />
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
              <DndProvider backend={HTML5Backend}>
                <div className={styles.JournalView}>
                  <Journal />
                </div>
              </DndProvider>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
