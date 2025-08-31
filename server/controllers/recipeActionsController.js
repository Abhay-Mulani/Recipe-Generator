// GET average rating and user's rating for a recipe
exports.getRecipeRating = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await require('../models/Recipe').findById(recipeId);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    const ratings = recipe.ratings || [];
    const avgRating = ratings.length
      ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(2)
      : null;
    let userRating = null;
    if (req.user) {
      const found = ratings.find(r => r.userId.toString() === req.user.id.toString());
      if (found) userRating = found.rating;
    }
    res.json({ avgRating, userRating });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch rating' });
  }
};
exports.removeFavourite = async (req, res) => {
  const { recipeId } = req.body;
  const userId = req.user.id;
  try {
    await Recipe.updateOne(
      { _id: recipeId },
      { $pull: { favorites: { userId } } }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove favourite.' });
  }
};
exports.getFavourites = async (req, res) => {
  const userId = req.user.id;
  try {
    const recipes = await Recipe.find({ 'favorites.userId': userId });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favourite recipes.' });
  }
};
const Recipe = require('../models/Recipe');

exports.rateRecipe = async (req, res) => {
  const { recipeId, rating } = req.body;
  const userId = req.user.id;
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    const existing = recipe.ratings.find(r => r.userId.toString() === userId.toString());
    if (existing) {
      existing.rating = rating;
    } else {
      recipe.ratings.push({ userId, rating });
    }
    await recipe.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to rate recipe.' });
  }
};

exports.favoriteRecipe = async (req, res) => {
  const { recipeId } = req.body;
  const userId = req.user.id;
  try {
    await Recipe.updateOne(
      { _id: recipeId },
      { $addToSet: { favorites: { userId } } }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to favorite recipe.' });
  }
};
