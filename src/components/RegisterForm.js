import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

const roleOptions = [
  { label: 'Admin', value: 'ROLE_ADMIN' },
  { label: 'User', value: 'ROLE_USER' }
];

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    roleNames: ['ROLE_USER']
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setForm((prev) => ({ ...prev, roleNames: [e.target.value] }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      let data;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        data = await res.text();
      }
      if (!res.ok) {
        throw new Error((data && data.error) || data || 'Registration failed');
      }
      setSuccess(typeof data === 'string' ? data : (data.message || 'Registration successful'));
      setForm({ name: '', userName: '', email: '', password: '', roleNames: ['ROLE_USER'] });
      // Redirect to login after short delay
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <div className="form-row">
        <label>Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label>Username</label>
        <input type="text" name="userName" value={form.userName} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <label>Role</label>
        <div className="role-radio-group">
          <label className="role-radio">
            <input
              type="radio"
              name="roleNames"
              value="ROLE_ADMIN"
              checked={form.roleNames[0] === 'ROLE_ADMIN'}
              onChange={() => setForm(prev => ({ ...prev, roleNames: ['ROLE_ADMIN'] }))}
              required
            />
            ROLE_ADMIN
          </label>
          <label className="role-radio">
            <input
              type="radio"
              name="roleNames"
              value="ROLE_USER"
              checked={form.roleNames[0] === 'ROLE_USER'}
              onChange={() => setForm(prev => ({ ...prev, roleNames: ['ROLE_USER'] }))}
            />
            ROLE_USER
          </label>
        </div>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      <button
        type="button"
        style={{ marginTop: 10, background: '#fff', color: '#1976d2', border: '1.5px solid #1976d2', fontWeight: 600 }}
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </form>
  );
};

export default RegisterForm;
