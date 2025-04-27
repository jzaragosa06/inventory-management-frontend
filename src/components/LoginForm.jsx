import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', formData);
      const { access_token } = response.data;

      //TODO: we will be extracting the user infos from the token
      const payload = JSON.parse(atob(access_token.split('.')[1]));

      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify({
        email: payload.email,
        role: payload.role,
        sub: payload.sub
      }));

      // TODO: Set the token in axios defaults
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      //TODO: redirect to the homepage once authentication is complete
      onSuccess?.();


    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Invalid email or password');
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