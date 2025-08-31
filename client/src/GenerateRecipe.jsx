import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GenerateRecipe() {
  const [ingredients, setIngredients] = useState('');
  const [dietary, setDietary] = useState([]);
  const [cuisine, setCuisine] = useState(''); // default none
  const [cookingTime, setCookingTime] = useState(''); // default none
  const [recipes, setRecipes] = useState([]);
  const [servings, setServings] = useState(1);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState('');
  const [addedNotice, setAddedNotice] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleGenerate = async () => {
    setError('');
    try {
  const res = await axios.post('https://recipe-generator-897f.onrender.com/api/recipes/generate', {
        ingredients: ingredients.split(',').map(i => i.trim()),
        dietary,
        servings,
      });
      setRecipes(res.data.recipes);
    } catch (err) {
      setError(err.response?.data?.error || 'Error generating recipe');
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', background: 'linear-gradient(135deg, #f8fbff 0%, #f8fbff 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Navbar style={{ maxWidth: 800,width:'600%' }} />
      <div style={{ maxHeight:'60%',width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}>
        <div style={{ maxWidth: 800, width: '100%', margin: '48px auto', background: '#fff', borderRadius: 28, boxShadow: '0 8px 32px rgba(0,0,0,0.10)', padding: '48px 38px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', top: 0 }}>
          <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: 32, marginBottom: 32, color: '#222', letterSpacing: 1 }}>Enter your ingredients</h2>
          <div style={{ width: '100%', marginBottom: 18 }}>
            <input type="text"  value={ingredients} onChange={e => setIngredients(e.target.value)} style={{ width: '100%', fontSize: 24, padding: '24px 22px', borderRadius: 18, border: 'none', outline: 'none', background: '#f8fbff', color: '#222', fontWeight: 700, letterSpacing: 1, boxShadow: '0 2px 12px #eee' }} />
            <div style={{ height: 6, width: '100%', background: 'linear-gradient(90deg,#ffb86c 0%,#ff6a6a 100%)', borderRadius: 3, marginTop: 2 }} />
            <div style={{ color: '#1ec97a', fontWeight: 700, fontSize: 16, marginTop: 8 }}>Enter  ingredients!</div>
          </div>
          <h3 style={{ textAlign: 'left', width: '100%', fontWeight: 800, fontSize: 22, marginBottom: 18, color: '#222' }}>Recipe Preferences</h3>
          <div style={{ width: '100%', marginBottom: 18 }}>
            <label style={{ fontWeight: 700, color: '#222', marginBottom: 10, fontSize: 18 }}>Serving Size:&nbsp;
              <input type="number" min={1} max={20} value={servings} onChange={e => setServings(Number(e.target.value))} style={{ width: 60, fontSize: 18, borderRadius: 8, border: '1px solid #eee', padding: '4px 8px', marginLeft: 8 }} />
            </label>
          </div>
          <div style={{ display: 'flex', gap: 18, marginBottom: 18, justifyContent: 'flex-start', width: '100%' }}>
            <div style={{ background: cuisine ? 'linear-gradient(90deg,#ffb86c,#ff6a6a)' : '#f8fbff', color: cuisine ? '#fff' : '#222', borderRadius: 24, padding: '12px 28px', fontWeight: 800, fontSize: 18, boxShadow: cuisine ? '0 2px 8px #ffb86c44' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 130, transition: 'background 0.2s', border: cuisine ? 'none' : '1.5px solid #eee' }}>
              {cuisine || 'Cuisine'}
            </div>
            <div style={{ background: cookingTime ? 'linear-gradient(90deg,#ffb86c,#ff6a6a)' : '#f8fbff', color: cookingTime ? '#fff' : '#222', borderRadius: 24, padding: '12px 28px', fontWeight: 800, fontSize: 18, boxShadow: cookingTime ? '0 2px 8px #ff6a6a44' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 130, transition: 'background 0.2s', border: cookingTime ? 'none' : '1.5px solid #eee' }}>
              {cookingTime || 'Cooking Time'}
            </div>
          </div>
          <div style={{ width: '100%', background: '#f8fbff', borderRadius: 18, padding: '28px 32px', marginBottom: 18, boxShadow: '0 2px 12px #eee' }}>
            <div style={{ fontWeight: 900, fontSize: 20, color: '#222', marginBottom: 18, letterSpacing: 1 }}>Recipe Preferences</div>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#222', marginBottom: 10 }}>Cuisine</div>
                {['Italian','Mexican','Indian','Chinese','American','Mediterranean','French'].map(c => (
                  <label key={c} style={{ display: 'block', marginBottom: 8, color: '#222', fontWeight: 600, fontSize: 18 }}>
                    <input type="radio" name="cuisine" value={c} checked={cuisine === c} onChange={() => setCuisine(c)} style={{ marginRight: 12 }} /> {c}
                  </label>
                ))}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#222', marginBottom: 10 }}>Cooking Time</div>
                {['Under 30 min','Under 1 hour','1-2 hours','2+ hours'].map(t => (
                  <label key={t} style={{ display: 'block', marginBottom: 8, color: '#222', fontWeight: 600, fontSize: 18 }}>
                    <input type="radio" name="cookingTime" value={t} checked={cookingTime === t} onChange={() => setCookingTime(t)} style={{ marginRight: 12 }} /> {t}
                  </label>
                ))}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#222', marginBottom: 10 }}>Dietary Preferences</div>
                {['Vegan','Vegetarian','Gluten-Free','Keto','Paleo','Low FODMAP','Dairy-Free','Nut-Free'].map(d => (
                  <label key={d} style={{ display: 'block', marginBottom: 8, color: '#222', fontWeight: 600, fontSize: 18 }}>
                    <input type="checkbox" value={d.toLowerCase()} checked={dietary.includes(d.toLowerCase())} onChange={e => setDietary(dietary => e.target.checked ? [...dietary, d.toLowerCase()] : dietary.filter(x => x !== d.toLowerCase()))} style={{ marginRight: 12 }} /> {d}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button onClick={handleGenerate} style={{ background: 'linear-gradient(90deg,#ff6a6a,#ffb86c)', color: '#fff', border: 'none', borderRadius: 14, padding: '18px 44px', fontWeight: 900, fontSize: 28, marginBottom: 24, cursor: 'pointer', marginTop: 10, boxShadow: '0 2px 12px #ff6a6a44', width: '100%' }}>Generate Recipe</button>
          {error && <p style={{ color: 'red', textAlign: 'center', marginTop: 18, fontWeight: 700, fontSize: 18 }}>{error}</p>}
          <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '24px', justifyContent: 'center', marginTop: 36, width: '100%' }}>
            {recipes.map((r, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 16px rgba(108,99,255,0.10)', padding: 16, width: 180, minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'none', color: '#222', fontFamily: 'inherit', position: 'relative', overflow: 'hidden', transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 24px #6c63ff22'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(108,99,255,0.10)'}
              >
                <img src={"https://images.unsplash.com/photo-1504674900247-0877df9cc836"} alt={r.name} style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 12, marginBottom: 10, boxShadow: '0 2px 8px #eee' }} />
                <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8, textAlign: 'center', color: '#222', letterSpacing: 0.5 }}>{r.name}</h3>
                <p style={{ fontSize: 13, marginBottom: 8, textAlign: 'center', color: '#444' }}><b>Ingredients:</b> {r.ingredients.map(ing => ing.split(/,|\*/)[0].replace(/\d.*$/, '').replace(/\s*\(.*\)/, '').trim()).join(', ')}</p>
                {(r.nutrition || r.calories || r.protein || r.carbs || r.fat) && (
                  <div style={{ fontSize: 12, color: '#555', marginBottom: 8, textAlign: 'center', background: '#f8fbff', borderRadius: 8, padding: '6px 10px', boxShadow: '0 2px 8px #eee' }}>
                    <b>Nutritional Info (per serving):</b><br />
                    Calories: {(r.nutrition?.calories ?? r.calories) || 'N/A'} kcal<br />
                    Protein: {(r.nutrition?.protein ?? r.protein) || 'N/A'} g<br />
                    Carbs: {(r.nutrition?.carbs ?? r.carbs) || 'N/A'} g<br />
                    Fat: {(r.nutrition?.fat ?? r.fat) || 'N/A'} g<br />
                    Sodium: {(r.nutrition?.sodium ?? r.sodium) || 'N/A'} mg<br />
                    Fiber: {(r.nutrition?.fiber ?? r.fiber) || 'N/A'} g<br />
                    Sugar: {(r.nutrition?.sugar ?? r.sugar) || 'N/A'} g<br />
                    Cholesterol: {(r.nutrition?.cholesterol ?? r.cholesterol) || 'N/A'} mg
                  </div>
                )}
                <button
                  style={{ background: selected.includes(i) ? '#6c63ff' : '#ffb86c', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 12px', fontWeight: 600, fontSize: 13, marginTop: 8, cursor: 'pointer', boxShadow: selected.includes(i) ? '0 2px 8px #6c63ff44' : '0 2px 8px #ffb86c44', transition: 'background 0.2s' }}
                  onClick={() => setSelected(selected => selected.includes(i) ? selected.filter(idx => idx !== i) : [...selected, i])}
                >{selected.includes(i) ? 'Selected' : 'Pick this Recipe'}</button>
              </div>
            ))}
          </div>
          {selected.length > 0 && (
            <button
              style={{ background: 'linear-gradient(90deg,#6c63ff,#ffb86c)', color: '#fff', border: 'none', borderRadius: 14, padding: '18px 44px', fontWeight: 900, fontSize: 28, marginTop: 36, cursor: 'pointer', display: 'block', marginLeft: 'auto', marginRight: 'auto', boxShadow: '0 2px 12px #6c63ff44', width: '100%' }}
              onClick={async () => {
                setError('');
                try {
                  const selectedRecipes = selected.map(idx => recipes[idx]);
                  await axios.post('https://recipe-generator-897f.onrender.com/api/recipes/save', selectedRecipes);
                  setAddedNotice(true);
                  // Optionally, clear selection and fetch latest recipes for Home
                  setSelected([]);
                } catch (err) {
                  setError('Failed to save recipes.');
                }
              }}
            >Add Selected</button>
          )}
          {addedNotice && (
            <div style={{ marginTop: 16, fontWeight: 600, color: '#1ec97a', fontSize: 14, textAlign:'center' }}>
              Recipes added! Check Home for your saved recipes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenerateRecipe;
