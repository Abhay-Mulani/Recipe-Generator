const express = require('express');
const router = express.Router();
const { generateRecipe, getRecipes, saveRecipe } = require('../controllers/recipesController');

// POST /api/recipes/generate
router.post('/generate', generateRecipe);

// POST /api/recipes/save
router.post('/save', saveRecipe);

// GET /api/recipes
router.get('/', getRecipes);

// GET /api/recipes/:id
const Recipe = require('../models/Recipe');
router.get('/:id', async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);
		if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
		res.json(recipe);
	} catch (err) {
		res.status(500).json({ error: 'Error fetching recipe.' });
	}
});

module.exports = router;
