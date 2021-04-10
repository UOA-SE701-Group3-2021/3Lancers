import { memo } from 'react';
import { useDrag } from 'react-dnd';
import RenderWidget from './renderWidget';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

  return (
    <div ref={drag} style={getStyles(position.col, position.row)}>
      {RenderWidget(type, { data, date, id, deleteWidget })}
    </div>
  );
});

export default DraggableWidget;
