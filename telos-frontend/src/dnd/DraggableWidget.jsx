import { memo, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { renderWidget } from './utils';

function getStyles(left, top, isDragging) {
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  };
}

// A component for widgets that can be dragged
const DraggableWidget = memo((props) => {
  const { _id, position, type, data } = props;
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type,
      item: { _id, position, data },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [_id, position, type]
  );

  // Hide the browser generated preview when widget is being dragged.
  // Let the custom drag layer render a new version with correct position when dragging.
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div ref={drag} style={getStyles(position.col, position.row, isDragging)}>
      {renderWidget(type, { data })}
    </div>
  );
});

export default DraggableWidget;
