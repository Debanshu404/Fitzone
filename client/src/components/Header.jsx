import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';

const Header = () => {
  const { auth, setAuth } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarState, setNavbarState] = useState('sticky'); // 'sticky', 'compact', 'hidden'
  const location = useLocation();
  const scrollTimeout = useRef(null);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;
    let hasTriggeredSecondPage = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollPercentage = (currentScrollY / (documentHeight - windowHeight)) * 100;

          // Detect when user has scrolled past first "page" (100vh)
          const isPastFirstPage = currentScrollY >= windowHeight * 0.7;

          // Check if near bottom (last 10%)
          const isNearBottom = scrollPercentage > 85;

          if (isPastFirstPage && !hasTriggeredSecondPage) {
            hasTriggeredSecondPage = true;
            setNavbarState('compact');
          } else if (!isPastFirstPage && hasTriggeredSecondPage && currentScrollY < windowHeight * 0.5) {
            hasTriggeredSecondPage = false;
            setNavbarState('sticky');
          }

          // Handle hide/show on scroll for compact mode
          if (navbarState === 'compact') {
            if (currentScrollY > lastScrollY + 10) {
              // Scrolling down
              setNavbarState('hidden');
            } else if (currentScrollY < lastScrollY - 5) {
              // Scrolling up
              setNavbarState('compact');
            }
            
            // Show compact navbar again when near bottom
            if (isNearBottom && navbarState === 'hidden') {
              setNavbarState('compact');
            }
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navbarState]);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: '' });
    localStorage.removeItem('auth');
    toast.success('Logout successfully');
  };

  const navItems = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/exercise', label: 'Exercises', icon: '💪' },
    { to: '/feedback', label: 'Feedback', icon: '💬' },
  ];

  // Get user display name or default
  const getUserName = () => {
    if (!auth?.user) return null;
    if (auth.user.name === 'admin') return 'Admin';
    return auth.user.name.length > 10 ? auth.user.name.slice(0, 8) + '...' : auth.user.name;
  };

  // Sticky navbar (full version)
  const StickyNavbar = () => (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out">
      <div className="backdrop-blur-xl border-b border-white/10 bg-slate-950/80 shadow-lg">
        <div className="px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-widest text-yellow-300">
                Gym<span className="text-white/95">Master</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 text-sm xl:text-base">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-white/90 hover:text-yellow-300 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
              {auth?.user?.name === 'admin' && (
                <Link
                  to="/dashboard/admin/create-plane"
                  className="text-white/90 hover:text-yellow-300 transition-colors duration-200"
                >
                  Create Plan
                </Link>
              )}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-5">
              {auth?.user ? (
                <>
                  <Link
                    to={auth.user.name === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                    className="text-white font-semibold capitalize hover:text-yellow-300 transition-colors duration-200"
                  >
                    {getUserName()}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white/90 hover:text-yellow-300 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="text-white/90 hover:text-yellow-300 transition-colors duration-200"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="rounded-full bg-white/15 px-5 py-2 text-white hover:bg-white/25 transition-all duration-200"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 p-2 text-white hover:bg-white/20 transition-all duration-200"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-white/10 mt-3 pt-4">
              <div className="flex flex-col gap-3 text-center">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-xl px-3 py-2 text-white/90 hover:bg-white/10 hover:text-yellow-300 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
                {auth?.user?.name === 'admin' && (
                  <Link
                    to="/dashboard/admin/create-plane"
                    className="rounded-xl px-3 py-2 text-white/90 hover:bg-white/10 hover:text-yellow-300 transition-all duration-200"
                  >
                    Create Plan
                  </Link>
                )}
                <div className="my-1 h-px bg-white/10" />
                {auth?.user ? (
                  <>
                    <Link
                      to={auth.user.name === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                      className="rounded-xl px-3 py-2 font-semibold capitalize text-white/90 hover:bg-white/10 hover:text-yellow-300 transition-all duration-200"
                    >
                      {getUserName()}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="rounded-xl px-3 py-2 text-white/90 hover:bg-white/10 hover:text-yellow-300 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="rounded-xl px-3 py-2 text-white/90 hover:bg-white/10 hover:text-yellow-300 transition-all duration-200"
                    >
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="rounded-xl px-3 py-2 text-white/90 hover:bg-white/10 hover:text-yellow-300 transition-all duration-200"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );

  // Compact floating navbar
  const CompactNavbar = () => (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[min(calc(100%-2rem), 900px)] animate-in slide-in-from-bottom-4 duration-300">
      <div className="backdrop-blur-xl bg-slate-900/85 border border-white/20 rounded-full shadow-2xl shadow-black/20">
        <div className="px-3 sm:px-5 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Compact Logo */}
            <Link to="/" className="shrink-0">
              <span className="text-lg sm:text-xl font-bold tracking-wider text-yellow-300">
                GM<span className="text-white/80 hidden xs:inline">aster</span>
              </span>
            </Link>

            {/* Navigation Icons - Desktop */}
            <nav className="hidden md:flex items-center gap-3 lg:gap-5">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-2 text-white/90 hover:text-yellow-300 transition-all duration-200 px-2 py-1 rounded-full hover:bg-white/10"
                  title={item.label}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm hidden lg:inline">{item.label}</span>
                </Link>
              ))}
              {auth?.user?.name === 'admin' && (
                <Link
                  to="/dashboard/admin/create-plane"
                  className="text-white/90 hover:text-yellow-300 transition-all duration-200 text-sm px-2 py-1 rounded-full hover:bg-white/10"
                >
                  ✨ Plan
                </Link>
              )}
            </nav>

            {/* User Info & Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {auth?.user ? (
                <>
                  <Link
                    to={auth.user.name === 'admin' ? '/dashboard/admin' : '/dashboard/user'}
                    className="flex items-center gap-1 sm:gap-2 text-white font-medium capitalize hover:text-yellow-300 transition-colors duration-200 bg-white/5 px-2 sm:px-3 py-1 rounded-full"
                  >
                    <span className="text-base sm:text-lg">👤</span>
                    <span className="text-xs sm:text-sm hidden xs:inline">{getUserName()}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white/80 hover:text-red-400 transition-all duration-200 bg-white/5 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                    title="Logout"
                  >
                    🚪
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3">
                  <Link
                    to="/register"
                    className="text-white/80 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/login"
                    className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm transition-all duration-200"
                  >
                    Login
                  </Link>
                </div>
              )}

              {/* Mobile menu button for compact view */}
              <button
                className="md:hidden inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 p-1.5 text-white hover:bg-white/20 transition-all duration-200"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu for Compact View */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-white/10">
              <div className="flex flex-wrap justify-center gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-white/90 hover:bg-white/15 hover:text-yellow-300 transition-all duration-200 text-sm"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
                {auth?.user?.name === 'admin' && (
                  <Link
                    to="/dashboard/admin/create-plane"
                    className="rounded-full bg-white/5 px-3 py-1.5 text-white/90 hover:bg-white/15 hover:text-yellow-300 transition-all duration-200 text-sm"
                  >
                    ✨ Create Plan
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Hidden state - render nothing
  if (navbarState === 'hidden') return null;

  return navbarState === 'sticky' ? <StickyNavbar /> : <CompactNavbar />;
};

export default Header;