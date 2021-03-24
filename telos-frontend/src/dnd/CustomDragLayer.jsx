import { useDragLayer } from 'react-dnd';
import { renderWidget } from './utils';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return { display: 'none' };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
  };
}

// Use a custom drag layer instead of relying on browser to enable smooth dragging and dropping
// Based from the example: https://react-dnd.github.io/react-dnd/examples/drag-around/custom-drag-layer
const CustomDragLayer = () => {
  const { item, itemType, isDragging, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));
  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {/* Render the appropriate widget based on the widget type (itemType). */}
        {/* This widget 'preview' is only rendered when dragging */}
        {renderWidget(itemType, item.data)}
      </div>
    </div>
  );
};

export default CustomDragLayer;
