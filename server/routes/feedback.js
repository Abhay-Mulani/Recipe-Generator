const express = require('express');
const router = express.Router();
const { addFeedback, getFeedback } = require('../controllers/feedbackController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addFeedback);
router.get('/:recipeId', getFeedback);

module.exports = router;
