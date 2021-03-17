import './Journal.css';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Page from './Page';

const Journal = () => (
  <div className="Journal">
    <ArrowBackIcon className="Arrow-left" />
    <Page />
    <Page />
    <ArrowForwardIcon className="Arrow-right" />
  </div>
);

export default Journal;
