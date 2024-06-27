import { useEffect, useState } from 'react';
import BasicLayout from '../components/BasicLayout';

import '../components/shapes.css';

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

// Given an array of circle of length n,
// test whether circles 1 to n-1 intersect with circle n
// return an array of the ids of those that do intersect
function testForCircleCollisions(circles) {
  const n = circles.length - 1;
  const target = circles[n];
  const hits = [];
  for (let i =  0; i < n; i++) {
    const circle = circles[i];
    // Square of sum of radii, plus 2 for the stroke width
    const r2 = (target.r + circle.r + 2) * (target.r + circle.r + 2);
    const dx = target.x - circle.x;
    const dy = target.y - circle.y;
    if (dx * dx + dy * dy <= r2) {
      hits.push(circle.id);
    }
  }
  return hits;
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
      items[n].x += event.movementX / CTM.a;
      items[n].y += event.movementY / CTM.d;
      const hits = testForCircleCollisions(items);
      items.forEach((item) => {
        item.collide = hits.includes(item.id);
      });
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
