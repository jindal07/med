import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth.jsx';
import { registerApi, getMeApi } from '../utils/api';
import LoadingOverlay from '../components/LoadingOverlay';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (form) => {
    setLoading(true);
    try {
      const res = await registerApi({ name: form.name, email: form.email, password: form.password });
      const token = res.data.token;
      // Optionally fetch user info
      let user = null;
      try {
        const meRes = await getMeApi();
        user = meRes.data;
      } catch (e) {
        user = null;
      }
      register(token, user);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <LoadingOverlay show={loading} />
      <AuthForm mode="register" onSubmit={handleRegister} loading={loading} />
      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default Register; 