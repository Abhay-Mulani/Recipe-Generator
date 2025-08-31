import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [comment, setComment] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const [favStatus, setFavStatus] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
  axios.get('https://recipe-generator-897f.onrender.com/api/recipes').then(res => {
      setRecipes(res.data);
    });
  }, [navigate, token]);

  const handleRate = async (recipeId, rating) => {
  await axios.post('https://recipe-generator-897f.onrender.com/api/recipe-actions/rate', { recipeId, rating }, { headers: { Authorization: `Bearer ${token}` } });
    alert('Thank you for rating!');
  };

  const handleFavorite = async (recipeId) => {
  await axios.post('https://recipe-generator-897f.onrender.com/api/recipe-actions/favorite', { recipeId }, { headers: { Authorization: `Bearer ${token}` } });
    setFavStatus({ ...favStatus, [recipeId]: true });
  };

  const handleShowFeedback = async (recipeId) => {
    setSelectedRecipe(recipeId);
  const res = await axios.get(`https://recipe-generator-897f.onrender.com/api/feedback/${recipeId}`);
    setFeedback({ ...feedback, [recipeId]: res.data });
  };

  const handleAddFeedback = async (recipeId) => {
  await axios.post('https://recipe-generator-897f.onrender.com/api/feedback', { recipeId, comment, rating }, { headers: { Authorization: `Bearer ${token}` } });
    setComment('');
    setRating(0);
    handleShowFeedback(recipeId);
  };

  // ...existing code...
  return (
  <div style={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(135deg, #6c63ff 0%, #222 100%)', paddingBottom: 40, fontFamily: 'Poppins, Arial, sans-serif', overflowX: 'hidden' }}>
      <Navbar />
      <h2 style={{ textAlign: 'center', marginTop: 30, color: '#fff', fontSize: 44, fontWeight: 900, letterSpacing: 1.5, textShadow: '0 2px 12px #222' }}>All Recipes</h2>
      <div style={{
        width: '100%',
        maxWidth: '1400px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '48px',
        margin: '48px auto 0',
        justifyItems: 'center',
      }}>
        {recipes.map((r, i) => (
          <div
            key={i}
            style={{
              background: '#fff',
              borderRadius: 32,
              boxShadow: '0 12px 36px rgba(108,99,255,0.18)',
              padding: '40px 32px',
              width: '100%',
              minWidth: 340,
              minHeight: 420,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '3px solid #ffb86c',
              color: '#222',
              fontFamily: 'inherit',
              position: 'relative',
              overflow: 'hidden',
              transition: 'box-shadow 0.2s, transform 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 20px 48px #6c63ff33';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(108,99,255,0.18)';
            }}
            onClick={() => navigate(`/recipe/${r._id}`, { state: { recipe: r } })}
          >
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt={r.name} style={{ width: '340px', height: '220px', objectFit: 'cover', borderRadius: 22, marginBottom: 24, boxShadow: '0 8px 32px #ffb86c44', border: '3px solid #e9e9ff' }} />
            <h3 style={{ fontWeight: 900, fontSize: 28, marginBottom: 18, textAlign: 'center', color: '#222', letterSpacing: 1 }}>{r.name}</h3>
            <p style={{ fontSize: 18, marginBottom: 16, textAlign: 'center', color: '#444', fontWeight: 500 }}><b>Ingredients:</b> {r.ingredients.map(ing => ing.split(/,|\*/)[0].replace(/\d.*$/, '').replace(/\s*\(.*\)/, '').trim()).join(', ')}</p>
            {r.nutrition && (
              <div style={{ fontSize: 16, color: '#555', marginBottom: 14, textAlign: 'center', background: '#f8fbff', borderRadius: 12, padding: '12px 18px', boxShadow: '0 2px 12px #eee', fontWeight: 500 }}>
                <b>Nutritional Info (per serving):</b><br />
                Calories: {r.nutrition.calories} kcal<br />
                Protein: {r.nutrition.protein} g<br />
                Carbs: {r.nutrition.carbs} g<br />
                Fat: {r.nutrition.fat} g
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
