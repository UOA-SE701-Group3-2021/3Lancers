import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import JournalCalendar from './components/calendar/JournalCalendar';
import reportWebVitals from './reportWebVitals';
import 'fontsource-roboto';

ReactDOM.render(
  <React.StrictMode>
    <JournalCalendar />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
