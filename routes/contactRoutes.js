const express = require('express');
const { createContactMessage } = require('../controllers/contactController');
const { validateContactInput } = require('../middleware/validateMiddleware');
const rateLimit = require('express-rate-limit');

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many contact requests, please try again later.',
    data: {},
  },
});

router.post('/', contactLimiter, validateContactInput, createContactMessage);

module.exports = router;

