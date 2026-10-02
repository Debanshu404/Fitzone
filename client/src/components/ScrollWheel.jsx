import React, { useEffect, useState, useRef } from 'react';

const ScrollWheel = ({ dark = false, label = 'FITZONE • SCROLL •' }) => {
  const [rotation, setRotation] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const delta = currentY - lastScrollY.current;

          // delta > 0 (scrolling down) -> rotates clockwise
          // delta < 0 (scrolling up) -> rotates counter-clockwise
          setRotation((prev) => prev + delta * 0.45);

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="absolute top-6 right-6 sm:top-8 sm:right-10 z-20 pointer-events-none select-none flex items-center justify-center"
      data-purpose="section-scroll-wheel"
    >
      <div
        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border shadow-sm transition-transform duration-75 ${
          dark
            ? 'bg-neutral-900 border-white/20 text-white'
            : 'bg-white border-black/15 text-neutral-900'
        }`}
        style={{
          transform: `rotate(${rotation}deg)`,
          willChange: 'transform',
        }}
      >
        {/* Curved Circular Text */}
        <svg className="w-full h-full p-0.5" viewBox="0 0 100 100">
          <path
            d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
            fill="transparent"
            id={`wheelCircle-${dark ? 'dark' : 'light'}`}
          ></path>
          <text
            className={`text-[8.5px] font-black tracking-[0.22em] uppercase ${
              dark ? 'fill-white' : 'fill-neutral-900'
            }`}
          >
            <textPath href={`#wheelCircle-${dark ? 'dark' : 'light'}`} startOffset="0%">
              {label}
            </textPath>
          </text>
        </svg>

        {/* Center Star / Crosshair Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xs ${dark ? 'text-ef-yellow' : 'text-ef-blue'}`}>✦</span>
        </div>
      </div>
    </div>
  );
};

export default ScrollWheel;
