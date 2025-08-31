const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadController');

// POST /api/upload
router.post('/', uploadImage);

module.exports = router;
