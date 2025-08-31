const Feedback = require('../models/Feedback');

exports.addFeedback = async (req, res) => {
  const { recipeId, comment, rating } = req.body;
  const userId = req.user.id;
  try {
    const feedback = await Feedback.create({ recipeId, userId, comment, rating });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add feedback.' });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ recipeId: req.params.recipeId }).populate('userId', 'email');
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedback.' });
  }
};
