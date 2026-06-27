const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  loginAdmin,
  getMessages,
  deleteMessage,
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
  getAnalytics,
} = require('../controllers/adminController');
const { protect, requireAdmin } = require('../middleware/authMiddleware');
const { validateLoginInput, validateProjectInput } = require('../middleware/validateMiddleware');

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts, please try again later.',
    data: {},
  },
});

router.post('/login', loginLimiter, validateLoginInput, loginAdmin);

router.use(protect, requireAdmin);

router.get('/messages', getMessages);
router.delete('/messages/:id', deleteMessage);
router.get('/projects', getAdminProjects);
router.post('/projects', validateProjectInput, createProject);
router.put('/projects/:id', validateProjectInput, updateProject);
router.delete('/projects/:id', deleteProject);
router.get('/analytics', getAnalytics);

module.exports = router;

