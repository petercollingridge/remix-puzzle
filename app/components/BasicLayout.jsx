import './basic_layout.css';

export default function BasicLayout() {
  return (
    <main>
      <svg id="puzzle-chamber" viewBox="-128 -128 256 256" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="shadow-filter">
            <feOffset result="offOut" in="SourceAlpha" dx="2" dy="2"/>
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="5" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
          <filter id="glow-filter" x="-250%" y="-250%" width="500%" height="500%">
            <feMorphology in="mask" result="dilated" operator="dilate" radius="1" />
            <feGaussianBlur stdDeviation="3" result="colouredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <rect className="background" x="-200" y="-200" width="400" height="400" />

        <p>Puzzle</p>

        <circle id="chamber-window" r="225" />
      </svg>
    </main>
  );
}
