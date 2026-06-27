const express = require('express');
const { getContent, updateContent } = require('../controllers/contentController');
const { protect, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getContent);
router.put('/', protect, requireAdmin, updateContent);

module.exports = router;
