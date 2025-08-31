const mongoose = require('mongoose');
require('dotenv').config();
const Recipe = require('../models/Recipe');

const sampleRecipes = [
  {
    name: 'Veggie Stir Fry',
    image: 'https://res.cloudinary.com/dwwyrxnca/image/upload/v1756360950/vegetable_stir_fry_afg7ly.jpg',
    ingredients: ['broccoli', 'carrot', 'bell pepper', 'soy sauce'],
    steps: ['Chop veggies', 'Stir fry in pan', 'Add soy sauce', 'Serve hot'],
    nutrition: { calories: 250, protein: 8, fat: 5, carbs: 40 },
    difficulty: 'Easy',
    cookingTime: 20,
    dietaryRestrictions: ['vegetarian', 'vegan'],
    substitutions: ['tofu for chicken'],
    ratings: [],
    favorites: []
  },
  {
    name: 'Chicken Salad',
    image: 'https://res.cloudinary.com/dwwyrxnca/image/upload/v1756361042/chicken-salad-10_sabspe.jpg',
    ingredients: ['chicken breast', 'lettuce', 'tomato', 'olive oil'],
    steps: ['Grill chicken', 'Chop veggies', 'Mix together', 'Drizzle olive oil'],
    nutrition: { calories: 300, protein: 25, fat: 10, carbs: 10 },
    difficulty: 'Medium',
    cookingTime: 30,
    dietaryRestrictions: ['gluten-free'],
    substitutions: ['turkey for chicken'],
    ratings: [],
    favorites: []
  },
  {
    name: 'Paneer Tikka',
    image: 'https://res.cloudinary.com/dwwyrxnca/image/upload/v1756361077/OIP_lvnyfl.jpg',
    ingredients: ['paneer', 'yogurt', 'spices', 'onion', 'capsicum'],
    steps: ['Marinate paneer', 'Skewer with veggies', 'Grill until golden'],
    nutrition: { calories: 400, protein: 18, fat: 25, carbs: 20 },
    difficulty: 'Medium',
    cookingTime: 40,
    dietaryRestrictions: ['vegetarian'],
    substitutions: ['tofu for paneer'],
    ratings: [],
    favorites: []
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Recipe.deleteMany({});
  await Recipe.insertMany(sampleRecipes);
  console.log('Sample recipes seeded!');
  mongoose.disconnect();
}

seed();
