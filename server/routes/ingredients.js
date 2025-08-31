const express = require('express');
const router = express.Router();
const { recognizeIngredients } = require('../controllers/ingredientsController');

// POST /api/ingredients/recognize
router.post('/recognize', recognizeIngredients);

module.exports = router;
