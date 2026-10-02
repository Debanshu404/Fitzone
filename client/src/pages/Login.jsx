import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth';
import { BASE_URL } from '../utils/fetchData';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success(res.data.message || 'Logged in successfully!');
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem('auth', JSON.stringify(res.data));
        navigate(location.state || '/');
      } else {
        toast.error(res.data.message || 'Invalid credentials');
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Authentication error. Please check credentials.';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] noise-bg flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-neutral-100 text-center relative">
        {/* Playful Brand Logo */}
        <Link to="/" className="inline-block mb-3">
          <span className="brand-script text-4xl text-ef-blue font-bold -rotate-3 inline-block hover:rotate-0 transition-transform">
            Fitzone
          </span>
        </Link>

        {/* Editorial Heading */}
        <h1 className="font-condensed-heading text-4xl sm:text-5xl uppercase tracking-tight text-neutral-900 mb-1 leading-none">
          MEMBER LOGIN
        </h1>
        <p className="font-serif italic text-lg text-neutral-500 mb-8">
          Welcome back to the training floor
        </p>

        <form onSubmit={onSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-neutral-600 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="athlete@fitzone.com"
              className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-ef-blue focus:ring-2 focus:ring-ef-blue/20 outline-none transition-all font-medium text-neutral-900 text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-600">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-bold text-ef-blue hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-ef-blue focus:ring-2 focus:ring-ef-blue/20 outline-none transition-all font-medium text-neutral-900 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-wave-action w-full mt-4 inline-flex items-center justify-center space-x-2 bg-ef-blue text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-ef-dark-blue shadow-lg transition-all duration-300 group disabled:opacity-50"
          >
            <svg className="btn-wave-layer" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 40">
              <path
                d="M0 20 C 150 5, 250 35, 400 20 C 550 5, 650 35, 800 20 C 950 5, 1050 35, 1200 20 L 1200 40 L 0 40 Z"
                fill="#ffffff"
              />
            </svg>
            <span className="relative z-10">{loading ? 'SIGNING IN...' : 'SIGN IN TO DASHBOARD'}</span>
            <span className="btn-icon-bounce relative z-10">→</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-100 text-xs font-semibold text-neutral-500">
          Not a member yet?{' '}
          <Link to="/register" className="text-ef-pink font-extrabold hover:underline">
            Join Fitzone Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
