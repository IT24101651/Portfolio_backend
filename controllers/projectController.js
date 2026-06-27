const mongoose = require('mongoose');
const Project = require('../models/Project');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });

  return res.json({
    success: true,
    message: 'Operation successful',
    data: projects,
  });
});

const getProjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, 'Invalid project id');
  }

  const project = await Project.findById(id);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  return res.json({
    success: true,
    message: 'Operation successful',
    data: project,
  });
});

module.exports = {
  getProjects,
  getProjectById,
};

