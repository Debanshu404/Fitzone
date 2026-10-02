import React, { useEffect } from 'react';
import { Hero, AboutSection, Plans, WhatWeDo, Trainers, FinalCTA, Reviews, FAQ } from '../components';

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    // Staggered reveal observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const sections = document.querySelectorAll('.reveal-section');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white text-ef-black noise-bg selection:bg-ef-blue selection:text-white overflow-x-hidden">
      {/* 1. Hero with mouse scrubber, impact title & train marquee */}
      <div className="reveal-section is-visible">
        <Hero />
      </div>

      {/* 2. About Section with tactile polaroids & handwritten stickers */}
      <div className="reveal-section">
        <AboutSection />
      </div>

      {/* 3. Flagship Programs with centered sticky trigger-sensitive card stacking */}
      <div className="reveal-section">
        <Plans />
      </div>

      {/* 4. Core Pillars / Services with colored poster cards */}
      <div className="reveal-section">
        <WhatWeDo />
      </div>

      {/* 5. Editorial Coaching Crew (ABCD-EF Style) */}
      <div className="reveal-section">
        <Trainers />
      </div>

      {/* 6. Community Reviews / Testimonials */}
      <div className="reveal-section">
        <Reviews />
      </div>

      {/* 7. Frequently Asked Questions */}
      <div className="reveal-section">
        <FAQ />
      </div>

      {/* 8. Final Call to Action with Cream background & Infinite Marquee */}
      <div className="reveal-section">
        <FinalCTA />
      </div>
    </div>
  );
};

export default Home;