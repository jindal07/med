import React, { useState } from 'react';

const AuthForm = ({ mode = 'login', onSubmit, loading }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm space-y-4">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
        {mode === 'login' ? 'Sign In' : 'Create Account'}
      </h2>
      {mode === 'register' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            required
            aria-describedby="name-error"
          />
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          required
          aria-describedby="email-error"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          required
          aria-describedby="password-error"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
        aria-describedby={loading ? "loading-status" : undefined}
      >
        {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Register'}
      </button>
      {loading && (
        <div id="loading-status" className="sr-only" aria-live="polite">
          Processing your request
        </div>
      )}
    </form>
  );
};

export default AuthForm; 