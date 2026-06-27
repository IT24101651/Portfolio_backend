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

function getAllowedOrigins() {
  const source = process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:5173';
  return source
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function validateRequiredEnv() {
  const required = ['MONGO_URI', 'JWT_SECRET'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (/[<>]/.test(process.env.MONGO_URI)) {
    throw new Error(
      'MONGO_URI still contains placeholder characters (< or >). Replace it with a real MongoDB connection string, and percent-encode any reserved characters in the username or password.',
    );
  }
}

async function ensureDefaultAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return;
  }

  const existingAdmin = await User.findOne({ email: email.toLowerCase() });
  if (existingAdmin) {
    return;
  }

  const admin = new User({
    name: 'Paviththiran Admin',
    email: email.toLowerCase(),
    password,
    role: 'admin',
  });

  await admin.save();
  console.log('Default admin account created.');
}

async function bootstrap() {
  validateRequiredEnv();

  await connectDB();
  await ensureDefaultAdmin();
  await seedDefaultProjects();

  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || getAllowedOrigins().includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
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
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.get('/api/health', (req, res) => {
    res.json({
      success: true,
      message: 'Operation successful',
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
      },
    });
  });

  app.use('/api/contact', contactRoutes);
  app.use('/api/content', contentRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/resume', resumeRoutes);
  app.use('/api/visitor', visitorRoutes);

  app.use(notFound);
  app.use(errorHandler);

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start backend server:', error.message);
  process.exit(1);
});
