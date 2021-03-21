import { useState } from 'react';
import habitStyles from './JournalHabitTracker.module.css';

const WeekScheduleBarHabitTracker = () => {
  const [monStatus, setMonStatus] = useState(false);
  const [tueStatus, setTueStatus] = useState(false);
  const [wedStatus, setWedStatus] = useState(false);
  const [thuStatus, setThuStatus] = useState(false);
  const [friStatus, setFriStatus] = useState(false);
  const [satStatus, setSatStatus] = useState(false);
  const [sunStatus, setSunStatus] = useState(false);

  return (
    <div className={habitStyles.WeekSchedule}>
      <ul>
        <li>
          <button
            className={`${monStatus === true ? '' : 'unselect'}`}
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
            className={`${tueStatus === true ? '' : 'unselect'}`}
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
            className={`${wedStatus === true ? '' : 'unselect'}`}
            onClick={() => setWedStatus(!wedStatus)}
            type="button"
          >
            W
          </button>
        </li>
        <li>
          <button
            className={`${thuStatus === true ? '' : 'unselect'}`}
            onClick={() => setThuStatus(!thuStatus)}
            type="button"
          >
            T
          </button>
        </li>
        <li>
          <button
            className={`${friStatus === true ? '' : 'unselect'}`}
            onClick={() => setFriStatus(!friStatus)}
            type="button"
          >
            F
          </button>
        </li>
        <li>
          <button
            className={`${satStatus === true ? '' : 'unselect'}`}
            onClick={() => setSatStatus(!satStatus)}
            type="button"
          >
            S
          </button>
        </li>
        <li>
          <button
            className={`${sunStatus === true ? '' : 'unselect'}`}
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
