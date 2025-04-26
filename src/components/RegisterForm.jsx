import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import api from '../api/axios';

const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      onSuccess?.();
    } catch (err) {
      setError('Registration failed. Please try again.');
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
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="auditor">Auditor</option>
      </select>
      <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;