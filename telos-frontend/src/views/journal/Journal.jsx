import { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DraggableWidget from '../../dnd/DraggableWidget';
import { WidgetTypes } from '../../dnd/WidgetTypes';
import Page from './Page';
import './Journal.css';

const Journal = () => {
  const [widgets, setWidgets] = useState([
    { widgetType: 'todo', id: 0, top: 200, left: 200 },
    { widgetType: 'habit_tracker', id: 1, top: 300, left: 300 },
  ]);

  const moveWidget = useCallback(
    (id, left, top) => {
      setWidgets(
        update(widgets, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [widgets]
  );

  const [, drop] = useDrop(
    () => ({
      accept: [
        WidgetTypes.TODO_LIST,
        WidgetTypes.CALENDAR,
        WidgetTypes.HABIT_TRACKER,
        WidgetTypes.TEXT,
      ],
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();

        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        console.log(left, top);

        moveWidget(item.id, left, top);
        return undefined;
      },
    }),
    [moveWidget]
  );

  return (
    <div className="Journal" ref={drop}>
      {widgets.map((widget) => (
        <DraggableWidget {...widget} />
      ))}
      <ArrowBackIcon className="Arrow-left" />
      <Page />
      <Page />
      <ArrowForwardIcon className="Arrow-right" />
    </div>
  );
};

export default Journal;
