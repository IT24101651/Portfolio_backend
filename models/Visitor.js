const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      default: 'Unknown',
      trim: true,
    },
    browser: {
      type: String,
      default: 'Unknown',
      trim: true,
    },
    userAgent: {
      type: String,
      default: '',
      trim: true,
    },
    visitDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Visitor', visitorSchema);

