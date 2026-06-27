const express = require('express');
const { getResume } = require('../controllers/resumeController');

const router = express.Router();

router.get('/', getResume);

module.exports = router;

