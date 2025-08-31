
import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle image upload to Cloudinary via backend
  const handleImageUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
  const res = await axios.post('https://recipe-generator-897f.onrender.com/api/upload', formData);
      setImageUrl(res.data.imageUrl);
      recognizeIngredients(res.data.imageUrl);
    } catch (err) {
      alert('Image upload failed');
    }
    setLoading(false);
  };

  // Call backend to recognize ingredients using Gemini
  const recognizeIngredients = async (url) => {
    setLoading(true);
    try {
  const res = await axios.post('https://recipe-generator-897f.onrender.com/api/ingredients/recognize', { imageUrl: url });
      setIngredients(res.data.ingredients);
      generateRecipe(res.data.ingredients);
    } catch (err) {
      alert('Ingredient recognition failed');
    }
    setLoading(false);
  };

  // Call backend to generate recipe suggestions
  const generateRecipe = async (ingredients) => {
    setLoading(true);
    try {
  const res = await axios.post('https://recipe-generator-897f.onrender.com/api/recipes/generate', { ingredients });
      setRecipes([res.data.recipe]);
    } catch (err) {
      alert('Recipe generation failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Smart Recipe Generator</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {loading && <p>Loading...</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '100%', marginTop: 10 }} />}
      {ingredients.length > 0 && (
        <div>
          <h2>Recognized Ingredients</h2>
          <ul>
            {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
          </ul>
        </div>
      )}
      {recipes.length > 0 && (
        <div>
          <h2>Recipe Suggestions</h2>
          <ul>
            {recipes.map((rec, i) => <li key={i}>{rec}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
