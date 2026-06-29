const mongoose = require('mongoose');
const Project = require('../models/Project');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

function getProjectOrder(project) {
  const parsedOrder = Number(project?.order);
  return Number.isFinite(parsedOrder) ? parsedOrder : Number.MAX_SAFE_INTEGER;
}

const getProjects = asyncHandler(async (req, res) => {
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
