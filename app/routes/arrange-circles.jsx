import { useEffect, useState } from 'react';
import BasicLayout from '../components/BasicLayout';
import { testForCircleCollisions } from '../utils/collisions';

import '../components/shapes.css';

const setup = [
  { id: 0, x: -64, y:   0, r: 32 },
  { id: 1, x:  64, y:   0, r: 32 },
  { id: 2, x:   0, y: -64, r: 32 },
];

function Circle({ id, selected, collide, select, x = 0, y = 0, r = 24 }) {
  let className = 'draggable-shape';
  if (selected) className += ' selected';
  else if (collide) className += ' collision';

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
  const [items, setItems] = useState(setup);

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
      items[n].x += event.movementX / CTM.a;
      items[n].y += event.movementY / CTM.d;
      const [hits, inside] = testForCircleCollisions(items[n], items.slice(0, -1));

      items.forEach((item) => {
        item.collide = hits.includes(item.id);
        item.child = inside.includes(item.id);
        if (item.collide || item.child) {
          item.r = 32 * 1.8;
        } else {
          item.r = 32;
        }
      });

      if (hits.length + inside.length > 0) {
        items[n].r = 32 * 0.7;
      } else {
        items[n].r = 32;
      }

      setItems([...items]);
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
