import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ef-black text-white pt-20 pb-12 border-t border-neutral-800" data-purpose="site-footer">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="md:col-span-4">
            <Link to="/" className="brand-script text-5xl sm:text-6xl text-white font-bold inline-block hover:text-ef-blue transition-colors">
              Fitzone
            </Link>
            <p className="text-neutral-400 text-sm mt-4 max-w-xs font-medium leading-relaxed">
              High-energy athletic training facility, tailored nutrition programs &amp; world-class coaching community.
            </p>
          </div>

          {/* Navigation Col */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-5">NAVIGATION</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li>
                <a href="#about" className="text-neutral-300 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#plans" className="text-neutral-300 hover:text-white transition-colors">Training Plans</a>
              </li>
              <li>
                <a href="#services" className="text-neutral-300 hover:text-white transition-colors">Core Pillars</a>
              </li>
              <li>
                <Link to="/exercise" className="text-neutral-300 hover:text-white transition-colors">Exercise DB</Link>
              </li>
              <li>
                <Link to="/feedback" className="text-neutral-300 hover:text-white transition-colors">Reviews &amp; FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-5">HEADQUARTERS</h4>
            <address className="not-italic text-sm font-medium text-neutral-300 space-y-2">
              <p>742 Iron Forge Blvd, Suite 100</p>
              <p>Metropolis Athletic District</p>
              <p className="pt-2">
                <a className="text-white hover:text-ef-blue transition-colors underline decoration-neutral-700" href="mailto:support@fitzone.com">
                  support@fitzone.com
                </a>
              </p>
              <p>
                <a className="text-neutral-400 hover:text-white transition-colors" href="tel:+18005553488">
                  +1 (800) 555-FITZONE
                </a>
              </p>
            </address>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-5">COMMUNITY</h4>
              <ul className="space-y-3 text-sm font-semibold md:text-right">
                <li>
                  <a className="text-neutral-300 hover:text-ef-pink transition-colors" href="https://instagram.com" target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a className="text-neutral-300 hover:text-red-500 transition-colors" href="https://youtube.com" target="_blank" rel="noreferrer">
                    YouTube
                  </a>
                </li>
                <li>
                  <a className="text-neutral-300 hover:text-ef-blue transition-colors" href="https://twitter.com" target="_blank" rel="noreferrer">
                    Twitter / X
                  </a>
                </li>
                <li>
                  <a className="text-neutral-300 hover:text-blue-400 transition-colors" href="https://linkedin.com" target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            {/* Back to top button */}
            <button
              aria-label="Back to top"
              onClick={scrollToTop}
              className="mt-8 p-3 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-white transition-all group"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 10l7-7m0 0l7 7m-7-7v18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-medium">
          <p>© {new Date().getFullYear()} Fitzone Athletic Club. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a className="hover:text-neutral-300 transition-colors" href="#terms">Privacy Policy</a>
            <a className="hover:text-neutral-300 transition-colors" href="#terms">Terms of Service</a>
            <span className="text-neutral-400">Engineered with Passion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
