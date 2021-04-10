import { useState } from 'react';
import { Tooltip } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import drawerStyle from './WidgetDrawer.module.css';


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
        <ChevronLeftIcon />
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
