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
  const { id, left, top, widgetType } = props;
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: widgetType,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );

  // Hide the browser generated preview when widget is being dragged.
  // Let the custom drag layer render a new version with correct position when dragging.
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div ref={drag} style={getStyles(left, top, isDragging)}>
      {renderWidget(widgetType, { id, left, top })}
    </div>
  );
});

export default DraggableWidget;
