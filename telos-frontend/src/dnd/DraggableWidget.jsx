import { FaTimes as Delete } from 'react-icons/fa';
import { memo } from 'react';
import { useDrag } from 'react-dnd';
import { renderWidget } from './utils';
import 'react-confirm-alert/src/react-confirm-alert.css';
import style from './DraggableWidget.module.css';

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
      <div className={style.header}>
        <Delete className={style.cross} onClick={() => deleteWidget(id)} />
      </div>
      {renderWidget(type, { data, date, id, deleteWidget })}
    </div>
  );
});

export default DraggableWidget;
