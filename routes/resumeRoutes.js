const express = require('express');
const { getResume, uploadResume } = require('../controllers/resumeController');
const { protect, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getResume);
router.post('/upload', protect, requireAdmin, uploadResume);

module.exports = router;
