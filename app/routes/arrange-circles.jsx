import { useEffect, useState } from 'react';
import BasicLayout from '../components/BasicLayout';

import '../components/shapes.css';

function DragCircle({ svgRef, x = 0, y = 0, r = 16 }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState(false);

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

    const handleMouseUp = (e) => {
      setSelected(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      // handleMouseMove.cancel();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [selected]);

  const className = 'draggable-shape' + (selected ? ' selected' : '');

  return (
    <circle
      className={className}
      onMouseDown={() => setSelected(true)}
      cx={pos.x}
      cy={pos.y}
      r={r}
    />
  );
}

export default function Circles() {
  return <BasicLayout Puzzle={DragCircle} />;
}
