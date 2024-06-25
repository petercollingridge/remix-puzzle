import BasicLayout from '../components/BasicLayout';

import '../components/shapes.css';

export default function Circles() {
  return (
    <BasicLayout>
      <circle className="draggable-shape" x="0" y="0" r="16" />
    </BasicLayout>
  );
}
