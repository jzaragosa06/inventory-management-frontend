import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import api from '../api/axios';

const LoginForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', formData);
      const { access_token } = response.data;
      // Store token in localStorage
      localStorage.setItem('user', JSON.stringify({
        ...response.data.user,
        role: response.data.user.role
      }));
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      onSuccess?.();
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;