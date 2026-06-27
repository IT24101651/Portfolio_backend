const Project = require('../models/Project');
const defaultProjects = require('./defaultProjects');

async function seedDefaultProjects() {
  const existingProjects = await Project.find({}, { title: 1 }).lean();
  const existingTitles = new Set(existingProjects.map((project) => project.title));
  const missingProjects = defaultProjects.filter((project) => !existingTitles.has(project.title));

  if (!missingProjects.length) {
    return;
  }

  await Project.insertMany(missingProjects, { ordered: false });
}

module.exports = seedDefaultProjects;
