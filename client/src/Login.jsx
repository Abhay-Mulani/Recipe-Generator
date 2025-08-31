

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)' }}>
      <form onSubmit={handleLogin} style={{ background: 'rgba(255,255,255,0.98)', borderRadius: 24, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', padding: '48px 36px', maxWidth: 400, width: '100%', textAlign: 'center', margin: '0 auto', position: 'relative' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: 18, color: '#2d3748', letterSpacing: '1px' }}>Login</h2>
        <p style={{ color: '#718096', marginBottom: 24, fontSize: '1rem' }}>Sign in to your Smart Recipe Generator account</p>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: 16, padding: '12px', fontSize: '1rem', border: '1px solid #cbd5e1', borderRadius: 8 }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: 16, padding: '12px', fontSize: '1rem', border: '1px solid #cbd5e1', borderRadius: 8 }} />
        <button type="submit" style={{ width: '100%', fontWeight: 700, fontSize: '1.1rem', padding: '12px 0', borderRadius: 8, background: 'linear-gradient(90deg, #3182ce 0%, #38b2ac 100%)', color: '#fff', border: 'none', boxShadow: '0 2px 12px #cbd5e1', cursor: 'pointer', marginBottom: 16, marginTop: 8 }}>Login</button>
        {error && <p style={{ color: 'red', marginTop: 8 }}>{error}</p>}
        <div style={{ marginTop: 10, fontSize: '1rem', color: '#4a5568' }}>
          New user?{' '}
          <a href="/register" style={{ color: '#38b2ac', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Register here</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
