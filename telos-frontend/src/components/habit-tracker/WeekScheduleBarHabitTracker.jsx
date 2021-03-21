import { useState } from 'react';
import habitStyle from './JournalHabitTracker.module.css';

const WeekScheduleBarHabitTracker = () => {
  const [monStatus, setMonStatus] = useState(false);
  const [tueStatus, setTueStatus] = useState(false);
  const [wedStatus, setWedStatus] = useState(false);
  const [thuStatus, setThuStatus] = useState(false);
  const [friStatus, setFriStatus] = useState(false);
  const [satStatus, setSatStatus] = useState(false);
  const [sunStatus, setSunStatus] = useState(false);

  return (
    <div className={habitStyle.WeekSchedule}>
      <ul>
        <li>
          <button
            className={`${monStatus === true ? '' : habitStyle.unselect}`}
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
            className={`${tueStatus === true ? '' : habitStyle.unselect}`}
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
            className={`${wedStatus === true ? '' : habitStyle.unselect}`}
            onClick={() => setWedStatus(!wedStatus)}
            type="button"
          >
            W
          </button>
        </li>
        <li>
          <button
            className={`${thuStatus === true ? '' : habitStyle.unselect}`}
            onClick={() => setThuStatus(!thuStatus)}
            type="button"
          >
            T
          </button>
        </li>
        <li>
          <button
            className={`${friStatus === true ? '' : habitStyle.unselect}`}
            onClick={() => setFriStatus(!friStatus)}
            type="button"
          >
            F
          </button>
        </li>
        <li>
          <button
            className={`${satStatus === true ? '' : habitStyle.unselect}`}
            onClick={() => setSatStatus(!satStatus)}
            type="button"
          >
            S
          </button>
        </li>
        <li>
          <button
            className={`${sunStatus === true ? '' : habitStyle.unselect}`}
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
