import { useState } from 'react';
import DatePicker from 'react-datepicker';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Page from './Page';
import './Journal.css';
import 'react-datepicker/dist/react-datepicker.css';

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const DAYS_TO_CHANGE_BY = 1;

const Journal = () => {
  const now = new Date();
  const [dateLeftPage, setDateLeftPage] = useState(now.getTime());
  const [dateRightPage, setDateRightPage] = useState(
    now.getTime() + DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY
  );

  function handleLeftNav() {
    setDateLeftPage(dateLeftPage - DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
    setDateRightPage(dateRightPage - DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
  }

  function handleRightNav() {
    setDateLeftPage(dateLeftPage + DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
    setDateRightPage(dateRightPage + DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
  }

  function handleLeftDatePick(selectedDate) {
    setDateLeftPage(selectedDate.getTime());
    setDateRightPage(selectedDate.getTime() + DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
  }

  function handleRightDatePick(selectedDate) {
    setDateRightPage(selectedDate.getTime());
    setDateLeftPage(selectedDate.getTime() - DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
  }

  function formatDateString(dateMilliseconds) {
    const date = new Date(dateMilliseconds);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  }

  return (
    <div className="Journal">
      <div className="Half-journal">
        <ArrowBackIcon className="Arrow-left" onClick={handleLeftNav} />
        <DatePicker
          selected={dateLeftPage}
          onChange={(selectedDate) => handleLeftDatePick(selectedDate)}
          dateFormat="MMMM d, yyyy"
          className="Date-select"
        />
        <Page date={formatDateString(dateLeftPage)} leftPage />
      </div>
      <div className="Half-journal">
        <DatePicker
          selected={dateRightPage}
          onChange={(selectedDate) => handleRightDatePick(selectedDate)}
          dateFormat="MMMM d, yyyy"
          className="Date-select"
        />
        <Page date={formatDateString(dateRightPage)} />
        <ArrowForwardIcon className="Arrow-right" onClick={handleRightNav} />
      </div>
    </div>
  );
};

export default Journal;
