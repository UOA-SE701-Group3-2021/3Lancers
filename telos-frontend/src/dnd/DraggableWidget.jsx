import { memo } from 'react';
import { useDrag } from 'react-dnd';
import { renderWidget } from './utils';

const axios = require('axios');

function getStyles(left, top) {
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
  };
}

// A component for widgets that can be dragged
const DraggableWidget = memo((props) => {
  const { id, position, type, data, date } = props;
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
  const deleteWidget = (pK) => {
    console.log(pK);
    axios.delete(`/api/journal/${pK}`);
    // TODO REALLY BAD IT JUST REFRESHES THE PAGE
    window.location.reload();
  };

  return (
    <div ref={drag} style={getStyles(position.col, position.row)}>
      {renderWidget(type, { data, date, id, deleteWidget })}
    </div>
  );
});

export default DraggableWidget;
