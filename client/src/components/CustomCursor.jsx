import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const render = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    const attachHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, [data-purpose="work-item"], .polaroid-item, .service-card');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    attachHoverListeners();
    const interval = setInterval(attachHoverListeners, 1500);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 hidden md:block ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Subtle Cream Dot (Direct Follower) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-[#faf8f5] border border-black/30 shadow-sm pointer-events-none transition-transform duration-75 ease-out"
        style={{ willChange: 'transform' }}
      />

      {/* Smooth Trailing Halo Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-3.5 -mt-3.5 rounded-full border border-black/25 pointer-events-none transition-all duration-200 ease-out ${
          isHovered
            ? 'w-10 h-10 -ml-5 -mt-5 bg-[#faf8f5]/40 border-ef-blue scale-110'
            : 'w-7 h-7 bg-[#faf8f5]/15'
        }`}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export default CustomCursor;
