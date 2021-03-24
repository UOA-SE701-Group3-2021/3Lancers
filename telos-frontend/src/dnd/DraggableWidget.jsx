import { memo } from 'react';
import { useDrag } from 'react-dnd';
import { renderWidget } from './utils';

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

  return (
    <div ref={drag} style={getStyles(position.col, position.row)}>
      {renderWidget(type, { data, date })}
    </div>
  );
});

export default DraggableWidget;
