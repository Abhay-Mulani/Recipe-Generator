
import React from 'react';
import { useNavigate } from 'react-router-dom';



function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)' }}>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 32px rgba(0,0,0,0.10)', padding: '48px 32px', maxWidth: 420, width: '100%', textAlign: 'center', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 24, color: '#2d3748' }}>Smart Recipe Generator</h1>
        <p style={{ fontSize: '1.1rem', color: '#4a5568', marginBottom: 18 }}>Features:</p>
        <ul style={{ textAlign: 'left', margin: '0 auto 24px', maxWidth: 320, color: '#2d3748', fontSize: '1rem', lineHeight: '1.7' }}>
          <li>Ingredient recognition from images</li>
          <li>Recipe matching algorithm</li>
          <li>Substitution suggestions</li>
          <li>Dietary restrictions handling</li>
          <li>View and rate recipes</li>
          <li>Mobile responsive design</li>
        </ul>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <button style={{ fontWeight: 600, fontSize: '1rem', padding: '10px 28px', borderRadius: 8, background: '#3182ce', color: '#fff', border: 'none', boxShadow: '0 2px 8px #cbd5e1', cursor: 'pointer' }} onClick={() => navigate('/login')}>Login</button>
          <button style={{ fontWeight: 600, fontSize: '1rem', padding: '10px 28px', borderRadius: 8, background: '#38b2ac', color: '#fff', border: 'none', boxShadow: '0 2px 8px #cbd5e1', cursor: 'pointer' }} onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
