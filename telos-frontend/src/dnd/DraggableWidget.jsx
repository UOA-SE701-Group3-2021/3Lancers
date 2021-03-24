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
  const { _id, position, type, data } = props;
  const [, drag] = useDrag(
    () => ({
      type,
      item: { _id, position, data },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [_id, position, type]
  );

  return (
    <div ref={drag} style={getStyles(position.col, position.row)}>
      {renderWidget(type, data)}
    </div>
  );
});

export default DraggableWidget;
