const express = require('express');
const rateLimit = require('express-rate-limit');
const { recordVisitor } = require('../controllers/visitorController');

const router = express.Router();

const visitorLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many visitor records, please try again later.',
    data: {},
  },
});

router.post('/', visitorLimiter, recordVisitor);

module.exports = router;

