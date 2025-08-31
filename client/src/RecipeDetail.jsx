
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RecipeDetail() {
  // Fetch average rating for the recipe
  const fetchAvgRating = () => {
    if (!recipe?._id || !token) return;
  axios.get(`https://recipe-generator-897f.onrender.com/api/recipe-actions/rating/${recipe._id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setAvgRating(res.data?.avgRating ?? null);
      })
      .catch(() => {
        setAvgRating(null);
      });
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(location.state?.recipe || null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // If no recipe in state, fetch by ID from URL
    if (!recipe) {
      const match = window.location.pathname.match(/\/recipe\/(\w+)/);
      const recipeId = match ? match[1] : null;
      if (recipeId) {
  axios.get(`https://recipe-generator-897f.onrender.com/api/recipes/${recipeId}`)
          .then(res => {
            if (!res.data || !res.data.name || !Array.isArray(res.data.ingredients)) {
              setLoadError(true);
              setRecipe(null);
            } else {
              setRecipe(res.data);
              setLoadError(false);
            }
          })
          .catch(() => {
            setLoadError(true);
            setRecipe(null);
          });
      }
    }
  }, [recipe]);
  const [feedback, setFeedback] = useState([]);
  const [avgRating, setAvgRating] = useState(null);

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteMsg, setFavoriteMsg] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [ratingMsg, setRatingMsg] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmitRating = () => {
    if (!recipe?._id || !token || !userRating) return;
  axios.post('https://recipe-generator-897f.onrender.com/api/recipe-actions/rate', { recipeId: recipe._id, rating: userRating }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setRatingMsg('Thank you for rating!');
        fetchAvgRating();
        setTimeout(() => setRatingMsg(''), 2000);
      })
      .catch(() => {
        setRatingMsg('Failed to submit rating.');
        setTimeout(() => setRatingMsg(''), 2000);
      });
  };

  useEffect(() => {
    if (recipe?._id) {
  axios.get(`https://recipe-generator-897f.onrender.com/api/feedback/${recipe._id}`).then(res => {
        setFeedback(res.data || []);
      });
      fetchAvgRating();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe, token, fetchAvgRating]);

  useEffect(() => {
    if (recipe?._id && token) {
      // No GET endpoint for favorite; optionally update isFavorite locally or after feedback fetch
    }
  }, [recipe, token]);

  const handleFavorite = () => {
    if (!recipe?._id || !token) return;
  axios.post('https://recipe-generator-897f.onrender.com/api/recipe-actions/favorite', { recipeId: recipe._id }, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setIsFavorite(true);
        setFavoriteMsg('Recipe added to favorites!');
        setTimeout(() => setFavoriteMsg(''), 2000);
      })
      .catch(() => {
        setFavoriteMsg('Failed to add to favorites.');
        setTimeout(() => setFavoriteMsg(''), 2000);
      });
  };

  const handleRatingChange = (e) => {
    setUserRating(Number(e.target.value));
  };

  const handleCommentChange = (e) => {
    setUserComment(e.target.value);
  };

  const handleAddFeedback = () => {
    if (!recipe?._id || !token || !userComment || !userRating) return;
  axios.post('https://recipe-generator-897f.onrender.com/api/feedback', { recipeId: recipe._id, comment: userComment, rating: userRating }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setUserComment('');
        setUserRating(0);
        setFeedbackMsg('Thank you for your feedback!');
  axios.get(`https://recipe-generator-897f.onrender.com/api/feedback/${recipe._id}`).then(res => {
          setFeedback(res.data || []);
        });
  // No GET endpoint for rating; optionally update avgRating locally or after feedback fetch
        setTimeout(() => setFeedbackMsg(''), 2000);
      })
      .catch(() => {
        setFeedbackMsg('Failed to submit feedback.');
        setTimeout(() => setFeedbackMsg(''), 2000);
      });
  };

  if (!recipe || loadError) {
    return (
      <div style={{ minHeight: '100vh', width: '100%' }}>
        <Navbar />
        <div style={{ color: '#fff', textAlign: 'center'}}>
          <h2>{loadError ? 'Failed to load recipe. Please try again or select another recipe.' : 'No recipe data found.'}</h2>
          <button onClick={() => navigate('/home')} style={{ background: '#6c63ff', color: '#fff', border:'5%', borderRadius: 8, padding: '10px 24px', fontWeight: 600, fontSize: 18, marginTop: 20, cursor: 'pointer' }}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
  <div style={{ minHeight: '100vh', width: '100%', background: 'linear-gradient(135deg,#f3f3ff 0%,#e9e9ff 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 40 }}>
      <Navbar />
  <div style={{  width: '195vh', margin: '40px auto', background: '#fff', borderRadius: 28, boxShadow: '0 12px 32px rgba(108,99,255,0.15)', padding: '56px 56px 48px 56px', color: '#222', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <img src={'https://images.unsplash.com/photo-1504674900247-0877df9cc836'} alt={recipe.name} style={{ width: '340px', height: '340px', objectFit: 'cover', borderRadius: 22, boxShadow: '0 4px 16px #6c63ff22', border: '2px solid #e9e9ff', marginBottom: 32 }} />
  <h2 style={{ fontSize: 38, fontWeight: 900, marginBottom: 32, textAlign: 'center', color: '#222', letterSpacing: 0.5 }}>{recipe.name}</h2>
        <div style={{ marginBottom: 32, width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontWeight: 700, color: '#6c63ff', fontSize: 26, display: 'block', marginBottom: 14 }}>Ingredients:</span>
          <ul style={{ color: '#444', margin: 0, marginTop: 8, fontSize: 20, paddingLeft: 24, borderLeft: '4px solid #6c63ff', background: '#f7f7ff', borderRadius: 12, boxShadow: '0 2px 8px #6c63ff11', paddingTop: 18, paddingBottom: 18, width: '100%' }}>
            {Array.isArray(recipe.ingredients) && recipe.ingredients.map((ing, idx) => (
              typeof ing === 'object' ? (
                <li key={idx} style={{ marginBottom: 8, paddingLeft: 4, fontWeight: 500 }}>{ing.item || ing.name || JSON.stringify(ing)} {ing.quantity ? `- ${ing.quantity}` : ''} {ing.unit || ''}</li>
              ) : (
                <li key={idx} style={{ marginBottom: 8, paddingLeft: 4, fontWeight: 500 }}>{ing}</li>
              )
            ))}
          </ul>
        </div>
        <div style={{ marginBottom: 24, width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontWeight: 700, color: '#6c63ff', fontSize: 22, display: 'block', marginBottom: 10 }}>Cooking Time:</span>
          <div style={{ color: '#444', fontSize: 18, paddingLeft: 24, borderLeft: '4px solid #6c63ff', background: '#f7f7ff', borderRadius: 12, boxShadow: '0 2px 8px #6c63ff11', paddingTop: 12, paddingBottom: 12, width: '100%', marginBottom: 8 }}>{recipe.cookingTime ?? recipe.time ?? 'N/A'} min</div>
        </div>
        <div style={{ marginBottom: 24, width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontWeight: 700, color: '#6c63ff', fontSize: 22, display: 'block', marginBottom: 10 }}>Difficulty:</span>
          <div style={{ color: '#444', fontSize: 18, paddingLeft: 24, borderLeft: '4px solid #6c63ff', background: '#f7f7ff', borderRadius: 12, boxShadow: '0 2px 8px #6c63ff11', paddingTop: 12, paddingBottom: 12, width: '100%', marginBottom: 8 }}>{recipe.difficulty ?? 'N/A'}</div>
        </div>
        <div style={{ marginBottom: 24, width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontWeight: 700, color: '#6c63ff', fontSize: 22, display: 'block', marginBottom: 10 }}>Dietary Restrictions:</span>
          <div style={{ color: '#444', fontSize: 18, paddingLeft: 24, borderLeft: '4px solid #6c63ff', background: '#f7f7ff', borderRadius: 12, boxShadow: '0 2px 8px #6c63ff11', paddingTop: 12, paddingBottom: 12, width: '100%', marginBottom: 8 }}>{Array.isArray(recipe.dietaryRestrictions) ? recipe.dietaryRestrictions.join(', ') : 'N/A'}</div>
        </div>
        <div style={{ marginBottom: 24, width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontWeight: 700, color: '#6c63ff', fontSize: 22, display: 'block', marginBottom: 10 }}>Substitutions:</span>
          <div style={{ color: '#444', fontSize: 18, paddingLeft: 24, borderLeft: '4px solid #6c63ff', background: '#f7f7ff', borderRadius: 12, boxShadow: '0 2px 8px #6c63ff11', paddingTop: 12, paddingBottom: 12, width: '100%', marginBottom: 8 }}>{Array.isArray(recipe.substitutions) ? recipe.substitutions.join(', ') : 'N/A'}</div>
        </div>
        <div style={{ marginBottom: 24, width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontWeight: 700, color: '#6c63ff', fontSize: 22, display: 'block', marginBottom: 10 }}>Add to Favorites:</span>
          <button onClick={handleFavorite} style={{ background: isFavorite ? '#ffb86c' : '#ffcc00', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', boxShadow: isFavorite ? '0 2px 8px #ffb86c44' : 'none', transition: 'background 0.2s' }}>
            {isFavorite ? 'Favorited' : 'Add to Favorite'}
          </button>
          {favoriteMsg && (
            <span style={{ color: isFavorite ? '#6c63ff' : '#ff5252', fontWeight: 600, marginTop: 10, fontSize: 16 }}>{favoriteMsg}</span>
          )}
        </div>
        <div style={{ marginBottom: 24, width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontWeight: 700, color: '#6c63ff', fontSize: 22, display: 'block', marginBottom: 10 }}>Rate this Recipe:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <select value={userRating} onChange={handleRatingChange} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: 10 }}>
              <option value={0}>Select Rating</option>
              <option value={1}>1★</option>
              <option value={2}>2★</option>
              <option value={3}>3★</option>
              <option value={4}>4★</option>
              <option value={5}>5★</option>
            </select>
            <button onClick={handleSubmitRating} style={{ background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 700, cursor: 'pointer', marginBottom: 10 }}>Submit Rating</button>
          </div>
          {ratingMsg && (
            <span style={{ color: '#6c63ff', fontWeight: 600, marginTop: 6, fontSize: 16 }}>{ratingMsg}</span>
          )}
        </div>
        <div style={{ marginBottom: 24, width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontWeight: 700, color: '#6c63ff', fontSize: 22, display: 'block', marginBottom: 10 }}>Leave Feedback:</span>
          <textarea rows="4" value={userComment} onChange={handleCommentChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: 10 }} placeholder="Write your feedback here..."></textarea>
          <button onClick={handleAddFeedback} style={{ background: '#6c63ff', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', marginTop: '10px' }}>Submit Feedback</button>
          {feedbackMsg && (
            <span style={{ color: '#6c63ff', fontWeight: 600, marginTop: 10, fontSize: 16 }}>{feedbackMsg}</span>
          )}
        </div>
        <div style={{ marginBottom: 24, width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontWeight: 700, color: '#6c63ff', fontSize: 22, display: 'block', marginBottom: 10 }}>Average User Rating:</span>
          <div style={{ color: '#444', fontSize: 18, paddingLeft: 24, borderLeft: '4px solid #6c63ff', background: '#f7f7ff', borderRadius: 12, boxShadow: '0 2px 8px #6c63ff11', paddingTop: 12, paddingBottom: 12, width: '100%', marginBottom: 8 }}>
            {avgRating ? `${Number(avgRating).toFixed(1)}★` : 'No ratings yet'}
          </div>
        </div>
        <div style={{ marginBottom: 24, width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span style={{ fontWeight: 700, color: '#6c63ff', fontSize: 22, display: 'block', marginBottom: 10 }}>User Feedback:</span>
          {feedback.length > 0 ? (
            <ul style={{ color: '#444', margin: 0, marginTop: 8, fontSize: 18, paddingLeft: 24, borderLeft: '4px solid #6c63ff', background: '#f7f7ff', borderRadius: 12, boxShadow: '0 2px 8px #6c63ff11', paddingTop: 12, paddingBottom: 12, width: '100%' }}>
              {feedback.map((fb, idx) => <li key={idx} style={{ marginBottom: 8, paddingLeft: 4, fontWeight: 500 }}>{fb.comment}</li>)}
            </ul>
          ) : (
            <span style={{ color: '#888', fontSize: 16 }}>No feedback yet.</span>
          )}
        </div>
        <button onClick={() => navigate('/home')} style={{ background: 'linear-gradient(90deg,#6c63ff,#ffb86c)', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 32px', fontWeight: 700, fontSize: 18, marginTop: 24, cursor: 'pointer', boxShadow: '0 2px 8px #6c63ff44' }}>Back to Home</button>
      </div>
    </div>
  );
}

export default RecipeDetail;
