import { useEffect, useState } from 'react';
import BasicLayout from '../components/BasicLayout';

import '../components/shapes.css';

function DragCircle({ svgRef, setParentClass, x = 0, y = 0, r = 24 }) {
  const [pos, setPos] = useState({ x, y });
  const [selected, setSelected] = useState(false);

  const select = () => {
    setSelected(true);
    setParentClass('dragging');
  };

  const deselect = () => {
    setSelected(false);
    setParentClass('hover');
  };

  useEffect(() => {
    if (!selected) {
      return;
    }

    const CTM = svgRef.current.getScreenCTM();

    const handleMouseMove = (event) => {
      setPos((prev) => ({
        x: prev.x + event.movementX / CTM.a,
        y: prev.y + event.movementY / CTM.d,
      }));
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", deselect);

    return () => {
      // handleMouseMove.cancel();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", deselect);
    };
  }, [selected]);

  const className = 'draggable-shape' + (selected ? ' selected' : '');

  return (
    <circle
      className={className}
      onMouseDown={select}
      cx={pos.x}
      cy={pos.y}
      r={r}
    />
  );
}

function Puzzle({ svgRef }) {
  const [className, setClassName] = useState('hover');

  const circles = [
    { x: -36, y: 0, r: 24 },
    { x:  36, y: 0, r: 24 },
  ];

  return (
    <g className={`puzzle ${className}`}>
      {circles.map((circle, index) => (
        <DragCircle key={index} svgRef={svgRef} setParentClass={setClassName} {...circle} />
      ))}
    </g>
  )
}

export default function Circles() {
  return <BasicLayout Puzzle={Puzzle} />;
}
