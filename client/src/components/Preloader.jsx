import React, { useEffect, useState } from 'react';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Only load once per browser session
    const hasLoaded = sessionStorage.getItem('fitzone_app_loaded');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFading(true);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('fitzone_app_loaded', 'true');
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 12;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100000] bg-[#faf8f5] flex flex-col items-center justify-center transition-opacity duration-500 select-none ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center px-6 text-center max-w-sm w-full">
        {/* Playful script badge */}
        <span className="brand-script text-3xl sm:text-4xl text-ef-blue font-bold -rotate-3 inline-block mb-1">
          Fitzone
        </span>

        {/* Condensed Impact Headline */}
        <h1 className="font-condensed-heading text-5xl sm:text-6xl text-ef-black tracking-tighter uppercase mb-4">
          ATHLETIC CLUB
        </h1>

        {/* Minimalist Progress Track */}
        <div className="w-full bg-neutral-200 h-1 rounded-full overflow-hidden mb-3">
          <div
            className="bg-ef-blue h-full transition-all duration-100 ease-out"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>

        {/* Percent indicator */}
        <div className="flex justify-between w-full text-[10px] font-black tracking-widest uppercase text-neutral-400 font-mono">
          <span>INITIALIZING</span>
          <span>{Math.min(100, progress)}%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
