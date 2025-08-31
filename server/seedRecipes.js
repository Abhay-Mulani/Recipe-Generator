const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
require('dotenv').config();

const recipes = [
  {
    name: 'Vegetarian Pasta',
    ingredients: ['pasta', 'tomato', 'onion', 'garlic'],
    steps: ['Boil pasta', 'Prepare sauce', 'Mix together'],
    nutrition: { calories: 400, protein: 12, fat: 5, carbs: 70 },
    difficulty: 'Easy',
    cookingTime: 30,
    dietaryRestrictions: ['vegetarian'],
    substitutions: ['gluten-free pasta'],
  },
  // ...add 19 more recipes with varied cuisines, restrictions, and substitutions
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Recipe.deleteMany({});
  await Recipe.insertMany(recipes);
  console.log('Database seeded!');
  mongoose.disconnect();
}

seed();
