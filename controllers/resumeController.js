const asyncHandler = require('../utils/asyncHandler');

const getResume = asyncHandler(async (req, res) => {
  const resumeUrl = process.env.RESUME_URL || '';

  return res.json({
    success: true,
    message: 'Operation successful',
    data: {
      resumeUrl,
    },
  });
});

module.exports = {
  getResume,
};

