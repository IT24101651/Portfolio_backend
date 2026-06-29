const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const Project = require('../models/Project');
const User = require('../models/User');
const Visitor = require('../models/Visitor');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

function getProjectOrder(project) {
  const parsedOrder = Number(project?.order);
  return Number.isFinite(parsedOrder) ? parsedOrder : Number.MAX_SAFE_INTEGER;
}

function signToken(userId) {
  if (!process.env.JWT_SECRET) {
    throw new ApiError(500, 'JWT_SECRET is not configured');
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || user.role !== 'admin') {
    throw new ApiError(401, 'Invalid credentials');
  }

  const passwordMatches = await user.comparePassword(password);
  if (!passwordMatches) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = signToken(user._id);

  return res.json({
    success: true,
    message: 'Operation successful',
    data: {
      token,
      admin: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
});

const getMessages = asyncHandler(async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });

  return res.json({
    success: true,
    message: 'Operation successful',
    data: messages,
  });
});

const deleteMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, 'Invalid message id');
  }

  const deletedMessage = await Contact.findByIdAndDelete(id);

  if (!deletedMessage) {
    throw new ApiError(404, 'Message not found');
  }

  return res.json({
    success: true,
    message: 'Operation successful',
    data: deletedMessage,
  });
});

const getAdminProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().lean();
  projects.sort((left, right) => {
    const orderDiff = getProjectOrder(left) - getProjectOrder(right);
    if (orderDiff !== 0) {
      return orderDiff;
    }

    const createdAtDiff = new Date(left.createdAt || 0).getTime() - new Date(right.createdAt || 0).getTime();
    if (createdAtDiff !== 0) {
      return createdAtDiff;
    }

    return String(left.title || '').localeCompare(String(right.title || ''));
  });

  return res.json({
    success: true,
    message: 'Operation successful',
    data: projects,
  });
});

const createProject = asyncHandler(async (req, res) => {
  const project = await Project.create(req.body);

  return res.status(201).json({
    success: true,
    message: 'Operation successful',
    data: project,
  });
});

const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, 'Invalid project id');
  }

  const project = await Project.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  return res.json({
    success: true,
    message: 'Operation successful',
    data: project,
  });
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, 'Invalid project id');
  }

  const deletedProject = await Project.findByIdAndDelete(id);

  if (!deletedProject) {
    throw new ApiError(404, 'Project not found');
  }

  return res.json({
    success: true,
    message: 'Operation successful',
    data: deletedProject,
  });
});

const getAnalytics = asyncHandler(async (req, res) => {
  const totalVisitors = await Visitor.countDocuments();

  const monthlyVisitors = await Visitor.aggregate([
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m',
            date: '$visitDate',
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const recentVisitors = await Visitor.find().sort({ visitDate: -1 }).limit(10);

  return res.json({
    success: true,
    message: 'Operation successful',
    data: {
      totalVisitors,
      monthlyVisitors,
      recentVisitors,
    },
  });
});

module.exports = {
  loginAdmin,
  getMessages,
  deleteMessage,
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
  getAnalytics,
};
