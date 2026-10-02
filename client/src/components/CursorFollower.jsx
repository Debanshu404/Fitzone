import React, { useEffect, useRef, useState } from 'react';

const CursorFollower = () => {
  const followerRef = useRef(null);
  const badgeWrapperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerX - 56}px, ${followerY - 56}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleMouseEnterInteractive = () => {
      if (badgeWrapperRef.current) {
        badgeWrapperRef.current.style.transform = 'scale(1.22) rotate(6deg)';
      }
    };

    const handleMouseLeaveInteractive = () => {
      if (badgeWrapperRef.current) {
        badgeWrapperRef.current.style.transform = 'scale(1) rotate(0deg)';
      }
    };

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [data-purpose="work-item"], #interactive-scrubber');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };

    addHoverListeners();
    const interval = setInterval(addHoverListeners, 2000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, [isVisible]);

  return (
    <div
      ref={followerRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 hidden md:flex items-center justify-center ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div
        ref={badgeWrapperRef}
        className="relative w-28 h-28 flex items-center justify-center transition-transform duration-300 transform scale-95"
      >
        {/* Blue Circular Disk matching Stitch style */}
        <div className="w-full h-full rounded-full bg-[#82aaff] text-ef-black shadow-2xl flex items-center justify-center p-1.5 border-2 border-white/60">
          {/* Curved Circular SVG Text */}
          <svg className="cursor-badge-spin w-full h-full" viewBox="0 0 100 100">
            <path
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="transparent"
              id="textCircle"
            ></path>
            <text className="text-[9px] font-black tracking-[0.24em] uppercase fill-[#111111]">
              <textPath href="#textCircle" startOffset="0%">
                FITZONE • PUSH LIMITS • SCROLL •
              </textPath>
            </text>
          </svg>
          {/* Center Dumbbell / Globe Icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
              className="w-7 h-7 text-neutral-900 stroke-[2]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="9" strokeWidth="2"></circle>
              <path d="M3.6 9h16.8M3.6 15h16.8" strokeWidth="1.6"></path>
              <ellipse cx="12" cy="12" rx="4.5" ry="9" strokeWidth="1.6"></ellipse>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursorFollower;
