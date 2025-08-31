import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FavouriteRecipes() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    axios
      .get('/api/recipe-actions/favourites', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRecipes(res.data));
  }, [navigate, token]);

  const handleRemoveFavourite = async (recipeId) => {
    await axios.post(
      '/api/recipe-actions/remove-favourite',
      { recipeId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setRecipes(recipes.filter((r) => r._id !== recipeId));
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 40 }}>
      <Navbar />
      <h2
        style={{
          textAlign: 'center',
          marginTop: 30,
          color: '#fff',
          fontSize: 38,
          fontWeight: 800,
          letterSpacing: 1,
          textShadow: '0 2px 8px #222',
        }}
      >
        Your Favourite Recipes
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '28px',
          width: '90%',
          margin: '32px auto 0',   // keeps the grid centered
          maxWidth: '1200px',
          justifyItems: 'center',  // centers individual cards
        }}
      >
        {recipes.length === 0 ? (
          <p
            style={{
              gridColumn: '1/-1',
              color: '#fff',
              fontSize: 20,
              textAlign: 'center',
              marginTop: 40,
            }}
          >
            No favourite recipes yet.
          </p>
        ) : (
          recipes.map((r, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.98)',
                borderRadius: 18,
                boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                padding: 18,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow =
                  '0 10px 24px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 6px 18px rgba(0,0,0,0.15)';
              }}
            >
              <div
                onClick={() =>
                  navigate(`/recipe/${r._id}`, { state: { recipe: r } })
                }
              >
                <img
                  src={
                    'https://images.unsplash.com/photo-1504674900247-0877df9cc836'
                  }
                  alt={r.name}
                  style={{
                    width: '100%',
                    height: 140,
                    objectFit: 'cover',
                    borderRadius: 12,
                    marginBottom: 12,
                  }}
                />
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 8,
                    color: '#222',
                  }}
                >
                  {r.name}
                </h3>
                <p style={{ marginBottom: 6, fontSize: 13, color: '#444' }}>
                  <span style={{ fontWeight: 700, color: '#6c63ff' }}>
                    Ingredients:
                  </span>{' '}
                  {r.ingredients.join(', ')}
                </p>
                <p style={{ marginBottom: 6, fontSize: 13, color: '#444' }}>
                  <span style={{ fontWeight: 700, color: '#6c63ff' }}>
                    Dietary:
                  </span>{' '}
                  {r.dietaryRestrictions.join(', ')}
                </p>
                <p style={{ marginBottom: 6, fontSize: 13, color: '#444' }}>
                  <span style={{ fontWeight: 700, color: '#6c63ff' }}>
                    Substitutions:
                  </span>{' '}
                  {r.substitutions.join(', ')}
                </p>
              </div>
              <button
                onClick={() => handleRemoveFavourite(r._id)}
                style={{
                  background: '#ff5252',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 14px',
                  fontWeight: 700,
                  fontSize: 13,
                  marginTop: 10,
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = '#e04848')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = '#ff5252')
                }
              >
                Remove from Favourites
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default FavouriteRecipes;
