require('dotenv').config();

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const User = require('./models/User');

const adminRoutes = require('./routes/adminRoutes');
const contentRoutes = require('./routes/contentRoutes');
const contactRoutes = require('./routes/contactRoutes');
const projectRoutes = require('./routes/projectRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const visitorRoutes = require('./routes/visitorRoutes');

const seedDefaultProjects = require('./utils/seedDefaultProjects');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

/* ---------------- ENV CHECK ---------------- */
function validateRequiredEnv() {
  const required = ['MONGO_URI', 'JWT_SECRET'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (/[<>]/.test(process.env.MONGO_URI)) {
    throw new Error(
      'MONGO_URI contains invalid characters (< >). Please fix your MongoDB connection string.',
    );
  }
}

/* ---------------- ROOT ROUTE (FIX YOUR ISSUE) ---------------- */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Portfolio Backend API is Running Successfully",
    status: "active",
    timestamp: new Date().toISOString(),
    routes: {
      health: "/api/health",
      contact: "/api/contact",
      content: "/api/content",
      projects: "/api/projects",
      admin: "/api/admin",
      resume: "/api/resume",
      visitor: "/api/visitor",
    },
  });
});

/* ---------------- DEFAULT ADMIN ---------------- */
async function ensureDefaultAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) return;

  const existingAdmin = await User.findOne({ email: email.toLowerCase() });
  if (existingAdmin) return;

  const admin = new User({
    name: 'Admin',
    email: email.toLowerCase(),
    password,
    role: 'admin',
  });

  await admin.save();
  console.log('Default admin account created.');
}

/* ---------------- BOOTSTRAP ---------------- */
async function bootstrap() {
  validateRequiredEnv();

  await connectDB();
  await ensureDefaultAdmin();
  await seedDefaultProjects();

  app.set('trust proxy', 1);

  /* ---------------- MIDDLEWARE ---------------- */
  app.use(helmet());

  app.use(
    cors({
      origin: function (origin, callback) {
        callback(null, true); // allow all origins (safe for portfolio)
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 200,
    })
  );

  /* ---------------- HEALTH CHECK ---------------- */
  app.get('/api/health', (req, res) => {
    res.json({
      success: true,
      status: "ok",
      message: "Server is healthy 🚀",
      timestamp: new Date().toISOString(),
    });
  });

  /* ---------------- ROUTES ---------------- */
  app.use('/api/contact', contactRoutes);
  app.use('/api/content', contentRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/resume', resumeRoutes);
  app.use('/api/visitor', visitorRoutes);

  /* ---------------- ERROR HANDLING ---------------- */
  app.use(notFound);
  app.use(errorHandler);

  /* ---------------- START SERVER ---------------- */
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`🚀 Backend running on port ${port}`);
  });
}

/* ---------------- START APP ---------------- */
bootstrap().catch((error) => {
  console.error('Failed to start backend server:', error.message);
  process.exit(1);
});