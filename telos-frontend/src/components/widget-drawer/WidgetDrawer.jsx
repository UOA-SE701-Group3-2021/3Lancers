import { useState } from 'react';
import { Tooltip } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import drawerStyle from './WidgetDrawer.module.css';

const Arrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
    <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
    <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z" />
  </svg>
);

const WidgetDrawer = ({ children, isRight, toggleIsRight }) => {
  const BLANK = '';
  const [isHidden, setisHidden] = useState(false);

  function handleOnClick() {
    setisHidden(() => !isHidden);
  }

  const PurpleSwitch = withStyles({
    switchBase: {
      color: purple[300],
      '&$checked': {
        color: purple[500],
      },
      '&$checked + $track': {
        backgroundColor: purple[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <div className={drawerStyle.WidgetDrawerParent}>
      <div
        className={`${drawerStyle.closer} ${isHidden ? drawerStyle.flipped : BLANK}`}
        onClick={handleOnClick}
      >
        <Arrow />
      </div>
      <div
        className={`${drawerStyle.WidgetDrawer} ${
          isHidden ? drawerStyle.technicallyHidden : BLANK
        }`}
      >
        <Tooltip title="Toggle for adding widgets left and right">
          <PurpleSwitch checked={isRight} onChange={toggleIsRight} name="checkedA" />
        </Tooltip>
        {children}
      </div>
    </div>
  );
};

export default WidgetDrawer;
