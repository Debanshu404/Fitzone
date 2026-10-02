import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL } from '../utils/fetchData';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!/^[A-Za-z ]+$/.test(name)) {
      toast.error('Name must contain only alphabets and spaces');
      return;
    }

    if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!city.trim()) {
      toast.error('Please enter your city');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/register`, {
        name,
        password,
        email,
        city,
        contact,
      });

      if (res && res.data.success) {
        toast.success(res.data.message || 'Account created successfully!');
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Registration failed');
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] noise-bg flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-neutral-100 text-center relative">
        {/* Playful Brand Logo */}
        <Link to="/" className="inline-block mb-3">
          <span className="brand-script text-4xl text-ef-blue font-bold -rotate-3 inline-block hover:rotate-0 transition-transform">
            Fitzone
          </span>
        </Link>

        {/* Editorial Heading */}
        <h1 className="font-condensed-heading text-4xl sm:text-5xl uppercase tracking-tight text-neutral-900 mb-1 leading-none">
          JOIN THE SQUAD
        </h1>
        <p className="font-serif italic text-lg text-neutral-500 mb-8">
          Start your transformation journey today
        </p>

        <form onSubmit={onSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-neutral-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Walker"
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-ef-blue focus:ring-2 focus:ring-ef-blue/20 outline-none transition-all font-medium text-neutral-900 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-neutral-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="athlete@fitzone.com"
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-ef-blue focus:ring-2 focus:ring-ef-blue/20 outline-none transition-all font-medium text-neutral-900 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-600 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-ef-blue focus:ring-2 focus:ring-ef-blue/20 outline-none transition-all font-medium text-neutral-900 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-600 mb-1">
                City / Location
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Metropolis"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-ef-blue focus:ring-2 focus:ring-ef-blue/20 outline-none transition-all font-medium text-neutral-900 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-neutral-600 mb-1">
              Contact Phone
            </label>
            <input
              type="tel"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="9876543210"
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-ef-blue focus:ring-2 focus:ring-ef-blue/20 outline-none transition-all font-medium text-neutral-900 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-wave-action w-full mt-4 inline-flex items-center justify-center space-x-2 bg-ef-pink text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-95 shadow-lg transition-all duration-300 group disabled:opacity-50"
          >
            <svg className="btn-wave-layer" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 40">
              <path
                d="M0 20 C 150 5, 250 35, 400 20 C 550 5, 650 35, 800 20 C 950 5, 1050 35, 1200 20 L 1200 40 L 0 40 Z"
                fill="#ffffff"
              />
            </svg>
            <span className="relative z-10">{loading ? 'CREATING ACCOUNT...' : 'CREATE ATHLETE ACCOUNT'}</span>
            <span className="btn-icon-bounce relative z-10">→</span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-neutral-100 text-xs font-semibold text-neutral-500">
          Already registered?{' '}
          <Link to="/login" className="text-ef-blue font-extrabold hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
