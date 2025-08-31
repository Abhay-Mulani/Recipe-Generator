const express = require('express');
const router = express.Router();
const { rateRecipe, favoriteRecipe, getFavourites, removeFavourite, getRecipeRating } = require('../controllers/recipeActionsController');
const { authMiddleware } = require('../middleware/authMiddleware');

// GET /api/recipe-actions/rating/:recipeId
router.get('/rating/:recipeId', authMiddleware, getRecipeRating);
router.post('/rate', authMiddleware, rateRecipe);
router.post('/favorite', authMiddleware, favoriteRecipe);
router.get('/favourites', authMiddleware, getFavourites);
router.post('/remove-favourite', authMiddleware, removeFavourite);

module.exports = router;
