const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: 1000,
    },
    image: {
      type: String,
      required: [true, 'Project image is required'],
      trim: true,
    },
    technologies: {
      type: [String],
      required: true,
      validate: {
        validator(value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: 'At least one technology is required',
      },
    },
    githubLink: {
      type: String,
      trim: true,
      default: '',
    },
    liveDemo: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      maxlength: 80,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Project', projectSchema);
