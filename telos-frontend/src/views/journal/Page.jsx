import { useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { confirmAlert } from 'react-confirm-alert';
import DraggableWidget from '../../dnd/DraggableWidget';
import { WidgetTypes } from '../../dnd/WidgetTypes';
import pageStyles from './Page.module.css';

const axios = require('axios');

const Page = ({ date, widgets, setWidgets }) => {
  // Initial widget data from the backend. Passed down to the widgets as their initial state.
  const [initialWidgetData, setInitialWidgetData] = useState({});
  const [update, setUpdate] = useState(1);

  // Fetch widgets for page/date
  useEffect(() => {
    axios.get(`/api/journal/${date}`).then(({ data }) => {
      const { widgetData, calendarData, habitData, textData, todoData } = data;
      const initData = {
        calendarData,
        habitData,
        textData,
        todoData,
      };

      setInitialWidgetData(initData);
      setWidgets(widgetData);
    });
  }, [date, update]);

  const moveWidget = useCallback(
    (id, left, top) => {
      const index = widgets.findIndex((w) => w._id === id);

      // Check if there is a widget with that id on this page.
      // Widgets are page specific and cannot be moved from one page to another
      if (index !== -1) {
        const newWidgets = [...widgets];
        const widget = { ...widgets[index] };

        // Would like to have a grid system in the future so that positions scale with screen size.
        widget.position = {
          row: top,
          col: left,
        };
        newWidgets[index] = widget;
        setWidgets(newWidgets);

        axios.put(`/api/journal/${id}`, widget);
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
        WidgetTypes.CLOCK,
      ],
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();

        const left = Math.round(item.position.col + delta.x);
        const top = Math.round(item.position.row + delta.y);

        moveWidget(item.id, left, top);
        return undefined;
      },
    }),
    [moveWidget]
  );

  // NOTE: will need to add in id argument when integrating text widget with
  // backend in the future.
  const getDataByWidgetType = (widgetType) => {
    switch (widgetType) {
      case WidgetTypes.TODO_LIST:
        return initialWidgetData.todoData;
      case WidgetTypes.HABIT_TRACKER:
        // not currently integrated with backend
        return initialWidgetData.habitData;
      case WidgetTypes.CALENDAR:
        // not currently integrated with backend
        return initialWidgetData.calendarData;
      case WidgetTypes.TEXT:
        // not currently integrated with backend
        // will need to take in id of text widget to get the exact text widget.
        return null;
      default:
        return null;
    }
  };

  const deleteWidget = (pK) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this widget?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.delete(`/api/journal/${pK}`);
            setUpdate(update + 1);
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  return (
    <div className={pageStyles.Page} ref={drop}>
      {widgets.map((widget) => (
        <DraggableWidget
          key={widget._id}
          id={widget._id}
          type={widget.type}
          position={widget.position}
          data={getDataByWidgetType(widget.type)}
          date={date}
          deleteWidget={deleteWidget}
        />
      ))}
      <textarea />
    </div>
  );
};

export default Page;
