const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: String,
  image: String, // Cloudinary or external image URL
  ingredients: [String],
  steps: [String],
  nutrition: {
    calories: Number,
    protein: Number,
    fat: Number,
    carbs: Number,
  },
  difficulty: String,
  cookingTime: Number,
  dietaryRestrictions: [String],
  substitutions: [String],
  ratings: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, rating: Number }],
  favorites: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
});

module.exports = mongoose.model('Recipe', RecipeSchema);
