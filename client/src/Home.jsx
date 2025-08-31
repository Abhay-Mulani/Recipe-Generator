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
    axios.get('/api/recipes').then(res => {
      setRecipes(res.data);
    });
  }, [navigate, token]);

  const handleRate = async (recipeId, rating) => {
    await axios.post('/api/recipe-actions/rate', { recipeId, rating }, { headers: { Authorization: `Bearer ${token}` } });
    alert('Thank you for rating!');
  };

  const handleFavorite = async (recipeId) => {
    await axios.post('/api/recipe-actions/favorite', { recipeId }, { headers: { Authorization: `Bearer ${token}` } });
    setFavStatus({ ...favStatus, [recipeId]: true });
  };

  const handleShowFeedback = async (recipeId) => {
    setSelectedRecipe(recipeId);
    const res = await axios.get(`/api/feedback/${recipeId}`);
    setFeedback({ ...feedback, [recipeId]: res.data });
  };

  const handleAddFeedback = async (recipeId) => {
    await axios.post('/api/feedback', { recipeId, comment, rating }, { headers: { Authorization: `Bearer ${token}` } });
    setComment('');
    setRating(0);
    handleShowFeedback(recipeId);
  };

  // ...existing code...
  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(135deg, #6c63ff 0%, #222 100%)', paddingBottom: 40, fontFamily: 'Poppins, Arial, sans-serif', overflowX: 'hidden' }}>
      <Navbar />
      <h2 style={{ textAlign: 'center', marginTop: 30, color: '#fff', fontSize: 38, fontWeight: 800, letterSpacing: 1, textShadow: '0 2px 8px #222' }}>All Recipes</h2>
      <div style={{
        width: '200%',
        maxWidth: '1200px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(320px, 1fr))',
        columnGap: '300px',
        rowGap: '100px',
        marginTop: 32,
        marginLeft: '10%',
        marginRight: '10%',
        justifyItems: 'center',
      }}>
        {recipes.map((r, i) => (
          <div
            key={i}
            style={{
              background: '#fff',
              borderRadius: 28,
              boxShadow: '0 8px 32px rgba(108,99,255,0.15)',
              padding: '32px 28px',
              width: '120%',
              height: '80%',
              minWidth: 320,
              minHeight: 320,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '2px solid #f8fbff',
              color: '#222',
              fontFamily: 'inherit',
              position: 'relative',
              overflow: 'hidden',
              transition: 'box-shadow 0.2s, transform 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 36px #6c63ff33'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(108,99,255,0.15)'}
            onClick={() => navigate(`/recipe/${r._id}`, { state: { recipe: r } })}
          >
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt={r.name} style={{ width: '100%', height: '50%', objectFit: 'cover', borderRadius: 18, marginBottom: 18, boxShadow: '0 6px 24px #ffb86c44', border: '2.5px solid #ffb86c' }} />
            <h3 style={{ fontWeight: 900, fontSize: 18, marginBottom: 8, textAlign: 'center', color: '#222', letterSpacing: 0.5 }}>{r.name}</h3>
            <p style={{ fontSize: 14, marginBottom: 10, textAlign: 'center', color: '#444', fontWeight: 500 }}><b>Ingredients:</b> {r.ingredients.map(ing => ing.split(/,|\*/)[0].replace(/\d.*$/, '').replace(/\s*\(.*\)/, '').trim()).join(', ')}</p>
            {r.nutrition && (
              <div style={{ fontSize: 13, color: '#555', marginBottom: 10, textAlign: 'center', background: '#f8fbff', borderRadius: 8, padding: '8px 12px', boxShadow: '0 2px 8px #eee' }}>
                <b>Nutritional Info (per serving):</b><br />
                Calories: {r.nutrition.calories} kcal<br />
                Protein: {r.nutrition.protein} g<br />
                Carbs: {r.nutrition.carbs} g<br />
                Fat: {r.nutrition.fat} g
              </div>
            )}
            {/* Favorite, rating, and feedback UI moved to RecipeDetail.jsx */}
            </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
