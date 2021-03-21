import { useState } from 'react';
import journalStyles from './JournalHabitTracker.module.css';

const WeekScheduleBarHabitTracker = () => {
  const [monStatus, setMonStatus] = useState(false);
  const [tueStatus, setTueStatus] = useState(false);
  const [wedStatus, setWedStatus] = useState(false);
  const [thuStatus, setThuStatus] = useState(false);
  const [friStatus, setFriStatus] = useState(false);
  const [satStatus, setSatStatus] = useState(false);
  const [sunStatus, setSunStatus] = useState(false);

  return (
    <div className={journalStyles.WeekSchedule}>
      <ul>
        <li>
          <button
            className={monStatus === true ? '' : journalStyles.unselect}
            onClick={() => {
              setMonStatus(!monStatus);
            }}
            type="button"
          >
            M
          </button>
        </li>
        <li>
          <button
            className={tueStatus === true ? '' : journalStyles.unselect}
            onClick={() => {
              setTueStatus(!tueStatus);
            }}
            type="button"
          >
            T
          </button>
        </li>
        <li>
          <button
            className={wedStatus === true ? '' : journalStyles.unselect}
            onClick={() => setWedStatus(!wedStatus)}
            type="button"
          >
            W
          </button>
        </li>
        <li>
          <button
            className={thuStatus === true ? '' : journalStyles.unselect}
            onClick={() => setThuStatus(!thuStatus)}
            type="button"
          >
            T
          </button>
        </li>
        <li>
          <button
            className={friStatus === true ? '' : journalStyles.unselect}
            onClick={() => setFriStatus(!friStatus)}
            type="button"
          >
            F
          </button>
        </li>
        <li>
          <button
            className={satStatus === true ? '' : journalStyles.unselect}
            onClick={() => setSatStatus(!satStatus)}
            type="button"
          >
            S
          </button>
        </li>
        <li>
          <button
            className={sunStatus === true ? '' : journalStyles.unselect}
            onClick={() => setSunStatus(!sunStatus)}
            type="button"
          >
            S
          </button>
        </li>
      </ul>
    </div>
  );
};

export default WeekScheduleBarHabitTracker;
