import { useState, useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import DraggableWidget from '../../dnd/DraggableWidget';
import { WidgetTypes } from '../../dnd/WidgetTypes';
import styles from './Page.module.css';

const Page = ({ date, leftPage }) => {
  const [widgets, setWidgets] = useState({});

  useEffect(() => {
    // Temp code to display all widgets. Remove when backend is ready.
    if (leftPage) {
      setWidgets({
        0: { widgetType: 'todo', top: 0, left: 0 },
        1: { widgetType: 'habit_tracker', top: 200, left: 200 },
      });
    } else {
      setWidgets({
        2: { widgetType: 'text', top: 100, left: 100 },
        3: { widgetType: 'calendar', top: 300, left: 300 },
      });
    }

    // TODO: Fetch widgets
  }, [date]);

  const moveWidget = useCallback(
    (id, left, top) => {
      // Widgets are page specific and cannot be moved from one page to another
      if (widgets[id]) {
        setWidgets(
          update(widgets, {
            [id]: {
              $merge: { left, top },
            },
          })
        );
      }
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

        moveWidget(item.id, left, top);
        return undefined;
      },
    }),
    [moveWidget]
  );

  return (
    <div className={styles.Page} ref={drop}>
      {Object.keys(widgets).map((key) => (
        <DraggableWidget id={key} {...widgets[key]} />
      ))}
      <textarea />
    </div>
  );
};

export default Page;
