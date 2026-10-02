import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';

const Header = () => {
  const { auth, setAuth } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: '' });
    localStorage.removeItem('auth');
    toast.success('Logged out successfully');
  };

  const navLinks = [
    { name: 'ABOUT', href: '#about', isHash: true },
    { name: 'PROGRAMS', href: '#plans', isHash: true },
    { name: 'PLANNER', href: '/planner', isHash: false },
    { name: 'SERVICES', href: '#services', isHash: true },
    { name: 'COACHES', href: '#trainers', isHash: true },
    { name: 'EXERCISES', href: '/exercise', isHash: false },
    { name: 'FEEDBACK', href: '/feedback', isHash: false },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo in Playful Script matching Stitch */}
        <Link to="/" className="group flex items-center space-x-1" aria-label="Fitzone Home">
          <span className="brand-script text-4xl sm:text-5xl text-ef-blue font-bold tracking-tight -rotate-3 inline-block group-hover:rotate-0 transition-transform duration-300">
            Fitzone
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-widest font-extrabold uppercase">
          {navLinks.map((link) =>
            link.isHash && location.pathname === '/' ? (
              <a
                key={link.name}
                href={link.href}
                className="text-neutral-800 hover:text-ef-blue transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-ef-blue hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.isHash ? `/${link.href}` : link.href}
                className="text-neutral-800 hover:text-ef-blue transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-ef-blue hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            )
          )}

          {auth?.user?.name === 'admin' && (
            <Link
              to="/dashboard/admin/create-plane"
              className="text-ef-pink hover:text-ef-blue transition-colors relative py-1"
            >
              + CREATE PLAN
            </Link>
          )}
        </nav>

        {/* Auth / Action Pill Button with Wave Animation */}
        <div className="hidden sm:flex items-center space-x-4">
          {auth?.user ? (
            <div className="flex items-center space-x-3">
              <Link
                to={auth.user.name === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                className="text-xs font-black uppercase tracking-wider text-neutral-800 hover:text-ef-blue transition-colors"
              >
                {auth.user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-wave-action inline-flex items-center space-x-2 text-xs font-black tracking-widest uppercase border border-gray-300 px-5 py-2.5 rounded-full hover:border-ef-blue hover:text-ef-blue hover:shadow-md transition-all duration-300 group"
            >
              <span className="w-2 h-2 rounded-full bg-ef-blue animate-pulse z-10"></span>
              <span className="z-10">SIGN IN</span>
              <svg className="btn-wave-layer" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 40">
                <path
                  d="M0 25 C 150 10, 250 40, 400 25 C 550 10, 650 40, 800 25 C 950 10, 1050 40, 1200 25 L 1200 40 L 0 40 Z"
                  fill="#0038ff"
                />
              </svg>
            </Link>
          )}

          <a
            href="#plans"
            className="btn-wave-action inline-flex items-center space-x-2 bg-ef-blue text-white text-xs font-black tracking-widest uppercase px-5 py-2.5 rounded-full hover:bg-ef-dark-blue shadow-md transition-all duration-300 group"
          >
            <svg className="btn-wave-layer" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 40">
              <path
                d="M0 25 C 150 10, 250 40, 400 25 C 550 10, 650 40, 800 25 C 950 10, 1050 40, 1200 25 L 1200 40 L 0 40 Z"
                fill="#ffffff"
              />
            </svg>
            <span className="relative z-10">START</span>
            <span className="btn-icon-bounce relative z-10">→</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-neutral-800 hover:text-ef-blue hover:bg-neutral-100 transition-colors"
          aria-label="Toggle mobile navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 font-extrabold uppercase text-sm tracking-wider">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.isHash ? `/${link.href}` : link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-800 hover:text-ef-blue py-1"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
            {auth?.user ? (
              <>
                <Link
                  to={auth.user.name === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-bold text-sm text-ef-blue"
                >
                  {auth.user.name}
                </Link>
                <button onClick={handleLogout} className="text-xs font-bold text-red-500 uppercase">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3 w-full">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-1/2 text-center py-2.5 rounded-full border border-gray-300 font-bold text-xs uppercase"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-1/2 text-center py-2.5 rounded-full bg-ef-blue text-white font-bold text-xs uppercase"
                >
                  Join
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;