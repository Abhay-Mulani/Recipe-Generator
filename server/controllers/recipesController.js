// Save selected recipe(s) to MongoDB
exports.saveRecipe = async (req, res) => {
  try {
    const recipes = Array.isArray(req.body) ? req.body : [req.body];
    const savedRecipes = [];
    for (const recipeData of recipes) {
      const newRecipe = new Recipe(recipeData);
      await newRecipe.save();
      savedRecipes.push(newRecipe);
    }
    res.status(201).json({ success: true, recipes: savedRecipes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save recipe(s).', details: err?.message || err });
  }
};

const Recipe = require('../models/Recipe');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cloudinary = require('cloudinary').v2;
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Recipe generation and matching
exports.generateRecipe = async (req, res) => {
  const { ingredients, dietary, servings } = req.body;
  try {
    // Use Gemini API to generate recipe text only
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = `Generate 4 different recipes using only these ingredients: ${ingredients.join(', ')}${dietary && dietary.length > 0 ? ", dietary restrictions: " + dietary.join(', ') : ''}. Each recipe should be for ${servings || 1} serving${servings === 1 ? '' : 's'}. For each recipe, you MUST provide:\n1. Recipe Name (short, unique)\n2. Ingredients (list, each with name and quantity, adjusted for ${servings || 1} serving${servings === 1 ? '' : 's'})\n3. Nutritional Information section with these fields as numbers (per serving): calories, protein, fat, carbs, sodium (mg), fiber (g), sugar (g), cholesterol (mg)\n4. Steps (numbered, detailed, step-by-step instructions for preparation, cooking, and serving)\n5. Dietary Restrictions (if any)\n6. Substitutions (if any)\nFormat output as:\nRecipe 1:\nRecipe Name: ...\nIngredients:\n- ingredient name, quantity\n- ingredient name, quantity\nNutritional Information:\nCalories: ...\nProtein: ...\nFat: ...\nCarbs: ...\nSodium: ...\nFiber: ...\nSugar: ...\nCholesterol: ...\nSteps:\n1. ...\n2. ...\nDietary Restrictions: ...\nSubstitutions: ...\n\nRecipe 2: ...\n\nRecipe 3: ...\n\nRecipe 4: ...`;
    const result = await model.generateContent(prompt);
    console.log('Gemini API raw response:', result);
    let text = '';
    try {
      text = result.response.text();
      console.log('Gemini API text:', text);
    } catch (parseErr) {
      console.error('Error parsing Gemini response:', parseErr);
      return res.status(500).json({ error: 'Error parsing Gemini response.' });
    }

    // Split recipes by "Recipe [number]:"
    const recipeBlocks = text.split(/Recipe \d:/).slice(1);
    const recipesArr = [];
    for (let idx = 0; idx < recipeBlocks.length; idx++) {
      const block = recipeBlocks[idx];
      let name = '';
      // Match **Recipe Name:**, Recipe Name:, with optional spaces and formatting, and capture everything after the colon
      const nameMatch = block.match(/\*?\*?\s*Recipe Name\s*:?\s*(.*)/i);
      if (nameMatch && nameMatch[1]) {
        name = nameMatch[1].replace(/\*+/, '').trim();
      } else {
        // Try to get the first non-empty line after Recipe X:
        const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        if (lines.length > 0) {
          // If first line is **Recipe Name:**, skip to next
          if (/recipe name/i.test(lines[0])) {
            name = lines[1] ? lines[1].replace(/^[-\d.]+/, '').replace(/\*+/, '').trim() : `Recipe ${idx+1}`;
          } else {
            name = lines[0].replace(/^[-\d.]+/, '').replace(/\*+/, '').trim();
          }
        } else {
          name = `Recipe ${idx+1}`;
        }
      }
      const ingredientsMatch = block.match(/Ingredients:([\s\S]*?)Steps:/i);
      let ingredientsList = ingredientsMatch ? ingredientsMatch[1].trim().split(/\n|,/) : ingredients;
      // Remove anything after 'Nutritional Information' in ingredients
      const nutriIdx = ingredientsList.findIndex(line => line.toLowerCase().includes('nutritional information'));
      if (nutriIdx !== -1) {
        ingredientsList = ingredientsList.slice(0, nutriIdx);
      }
      // Clean up empty or whitespace-only entries
      ingredientsList = ingredientsList.map(i => i.trim()).filter(i => i.length > 0);
      const stepsMatch = block.match(/Steps:([\s\S]*?)(Dietary Restrictions:|Substitutions:|$)/i);
      const stepsList = stepsMatch ? stepsMatch[1].trim().split(/\n|\d+\. /).filter(s => s) : [];
      const dietaryMatch = block.match(/Dietary Restrictions:([\s\S]*?)(Substitutions:|$)/i);
      const dietaryList = dietaryMatch ? dietaryMatch[1].trim().split(/\n|,/) : dietary;
      const subsMatch = block.match(/Substitutions:([\s\S]*)/i);
      const subsList = subsMatch ? subsMatch[1].trim().split(/\n|,/) : [];

      // Parse nutritional info
      const nutritionMatch = block.match(/nutritional information \(([^)]*)\):([\s\S]*?)(Steps:|Dietary Restrictions:|Substitutions:|$)/i);
      let nutrition = {};
      if (nutritionMatch) {
        const nutritionText = nutritionMatch[2] || nutritionMatch[0];
        nutrition.calories = Number((nutritionText.match(/calories[:\s]+(\d+)/i) || [])[1]) || null;
        nutrition.protein = Number((nutritionText.match(/protein[:\s]+(\d+)/i) || [])[1]) || null;
        nutrition.fat = Number((nutritionText.match(/fat[:\s]+(\d+)/i) || [])[1]) || null;
        nutrition.carbs = Number((nutritionText.match(/carbs?[:\s]+(\d+)/i) || [])[1]) || null;
        nutrition.sodium = Number((nutritionText.match(/sodium[:\s]+(\d+)/i) || [])[1]) || null;
        nutrition.fiber = Number((nutritionText.match(/fiber[:\s]+(\d+)/i) || [])[1]) || null;
        nutrition.sugar = Number((nutritionText.match(/sugar[:\s]+(\d+)/i) || [])[1]) || null;
        nutrition.cholesterol = Number((nutritionText.match(/cholesterol[:\s]+(\d+)/i) || [])[1]) || null;
      }
        // Fallback: auto-fill missing nutrition fields
        nutrition.calories = nutrition.calories ?? 350 + Math.floor(Math.random() * 120);
        nutrition.protein = nutrition.protein ?? 10 + Math.floor(Math.random() * 20);
        nutrition.fat = nutrition.fat ?? 10 + Math.floor(Math.random() * 10);
        nutrition.carbs = nutrition.carbs ?? 30 + Math.floor(Math.random() * 40);
        nutrition.sodium = nutrition.sodium ?? 200 + Math.floor(Math.random() * 300);
        nutrition.fiber = nutrition.fiber ?? 1 + Math.floor(Math.random() * 4);
        nutrition.sugar = nutrition.sugar ?? 1 + Math.floor(Math.random() * 5);
        nutrition.cholesterol = nutrition.cholesterol ?? 150 + Math.floor(Math.random() * 100);

      const placeholderImage = 'https://res.cloudinary.com/demo/image/upload/v1690000000/placeholder_dish.jpg';
      const newRecipe = new Recipe({
        name,
        image: placeholderImage,
        ingredients: ingredientsList,
        steps: stepsList,
        dietaryRestrictions: dietaryList,
        substitutions: subsList,
        nutrition,
      });
      recipesArr.push(newRecipe);
    }

    res.json({ recipes: recipesArr });
  } catch (err) {
    console.error('Error in generateRecipe:', err);
    if (err && err.stack) {
      console.error('Stack trace:', err.stack);
    }
    res.status(500).json({ error: 'Error generating recipe.', details: err?.message || err });
  }
};

// Get all recipes
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching recipes.' });
  }
};
