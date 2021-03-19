import { useState } from 'react';
import './Journal.css';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DatePicker from 'react-datepicker';
import Page from './Page';
import 'react-datepicker/dist/react-datepicker.css';

const Journal = () => {
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const DAYS_TO_CHANGE_BY = 1;
  const date = new Date();
  const [dateLeftPage, setDateLeftPage] = useState(date.getTime());
  const [dateRightPage, setDateRightPage] = useState(
    date.getTime() + DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY
  );

  function handleLeftNav() {
    setDateLeftPage(dateLeftPage - DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
    setDateRightPage(dateRightPage - DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
  }

  function handleRightNav() {
    setDateLeftPage(dateLeftPage + DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
    setDateRightPage(dateRightPage + DAYS_TO_CHANGE_BY * MILLISECONDS_PER_DAY);
  }

  return (
    <div className="Journal">
      <div className="Half-journal">
        <ArrowBackIcon className="Arrow-left" onClick={handleLeftNav} />
        <DatePicker
          selected={dateLeftPage}
          onChange={(selectedDate) => setDateLeftPage(selectedDate.getTime())}
          dateFormat="MMMM d, yyyy"
          className="Date-select"
        />
        <Page newDate={dateLeftPage} className="Page" />
      </div>
      <div className="Half-journal">
        <DatePicker
          selected={dateRightPage}
          onChange={(selectedDate) => setDateLeftPage(selectedDate.getTime())}
          dateFormat="MMMM d, yyyy"
          className="Date-select"
        />
        <Page newDate={dateRightPage} className="Page" />
        <ArrowForwardIcon className="Arrow-right" onClick={handleRightNav} />
      </div>
    </div>
  );
};

export default Journal;
