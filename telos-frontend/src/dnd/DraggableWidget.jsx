import { memo } from 'react';
import { useDrag } from 'react-dnd';
// import { confirmAlert } from 'react-confirm-alert';
import { renderWidget } from './utils';
import 'react-confirm-alert/src/react-confirm-alert.css';

// const axios = require('axios');

function getStyles(left, top) {
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
  };
}

// A component for widgets that can be dragged
const DraggableWidget = memo(({ id, position, type, data, date, deleteWidget }) => {
  // const { id, position, type, data, date, update } = props;
  const [, drag] = useDrag(
    () => ({
      type,
      item: { id, position },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, position, type]
  );

  // make function to delete using id
  // const deleteWidget = (pK) => {
  //   confirmAlert({
  //     title: 'Confirm to delete',
  //     message: 'Are you sure you want to delete this widget?',
  //     buttons: [
  //       {
  //         label: 'Yes',
  //         onClick: () => {
  //           axios.delete(`/api/journal/${pK}`);
  //           // TODO REALLY BAD IT JUST REFRESHES THE PAGE
  //           // window.location.reload();
  //           update = update + 1;
  //         },
  //       },
  //       {
  //         label: 'No',
  //       },
  //     ],
  //   });
  // };

  return (
    <div ref={drag} style={getStyles(position.col, position.row)}>
      {renderWidget(type, { data, date, id, deleteWidget })}
    </div>
  );
});

export default DraggableWidget;
