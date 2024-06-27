import { useEffect, useState } from 'react';
import BasicLayout from '../components/BasicLayout';

import '../components/shapes.css';

function Circle({ id, selected, select, x = 0, y = 0, r = 24 }) {
  const className = 'draggable-shape' + (selected ? ' selected' : '');

  return (
    <circle
      className={className}
      onMouseDown={() => select(id)}
      cx={x}
      cy={y}
      r={r}
    />
  );
}

function Puzzle({ svgRef }) {
  const [className, setClassName] = useState('hover');
  const [selectedItem, setSelectedItem] = useState(-1);

  const [items, setItems] = useState([
    { id: 0, x: -36, y: 0, r: 24 },
    { id: 1, x:  36, y: 0, r: 24 },
  ]);

  const select = (id) => {
    setSelectedItem(id);
    setClassName('dragging');
    // Move selected item to end of array so it's drawn in front of the rest
    const newItems = items.filter((item) => item.id !== id);
    const selectedItem = items.find((item) => item.id === id);
    newItems.push(selectedItem);
    setItems(newItems);
  };

  const deselect = () => {
    setSelectedItem(-1);
    setClassName('hover');
  };

  useEffect(() => {
    if (selectedItem === -1) {
      return;
    }

    const CTM = svgRef.current.getScreenCTM();
    const n = items.length - 1;

    const handleMouseMove = (event) => {
      setItems((oldItems) => {
        // Not sure why we have to divide by 2
        oldItems[n].x += event.movementX / CTM.a / 2;
        oldItems[n].y += event.movementY / CTM.d / 2;
        return [...oldItems];
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", deselect);

    return () => {
      // handleMouseMove.cancel();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", deselect);
    };
  }, [selectedItem]);

  return (
    <g className={`puzzle ${className}`}>
      {items.map((item) => (
        <Circle
          key={item.id}
          select={select}
          selected={selectedItem === item.id}
          {...item}
        />
      ))}
    </g>
  )
}

export default function Circles() {
  return <BasicLayout Puzzle={Puzzle} />;
}
