import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth.jsx';
import { loginApi, getMeApi } from '../utils/api';
import LoadingOverlay from '../components/LoadingOverlay';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (form) => {
    setLoading(true);
    try {
      const res = await loginApi({ email: form.email, password: form.password });
      const token = res.data.token;
      // Optionally fetch user info
      let user = null;
      try {
        const meRes = await getMeApi();
        user = meRes.data;
      } catch (e) {
        user = null;
      }
      login(token, user);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <LoadingOverlay show={loading} />
      <AuthForm mode="login" onSubmit={handleLogin} loading={loading} />
      <p className="mt-4 text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
      </p>
    </div>
  );
};

export default Login; 