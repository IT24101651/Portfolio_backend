const fs = require('node:fs/promises');
const path = require('node:path');
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

function getFileExtension(fileName = '') {
  const extension = path.extname(String(fileName || '')).toLowerCase();
  return extension === '.pdf' ? extension : '.pdf';
}

function parseDataUrl(fileDataUrl = '') {
  const value = String(fileDataUrl || '');
  const match = value.match(/^data:([^;]+);base64,(.+)$/);

  if (!match) {
    return null;
  }

  return {
    mimeType: match[1],
    base64Data: match[2],
  };
}

const uploadResume = asyncHandler(async (req, res) => {
  const fileDataUrl = req.body?.fileDataUrl;
  const fileName = String(req.body?.fileName || 'resume.pdf').trim() || 'resume.pdf';
  const parsed = parseDataUrl(fileDataUrl);

  if (!parsed || !parsed.mimeType.includes('pdf')) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      data: { errors: ['fileDataUrl must be a PDF data URL'] },
    });
  }

  const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
  const storedFileName = `resume${getFileExtension(fileName)}`;
  const targetPath = path.join(uploadDir, storedFileName);

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(targetPath, Buffer.from(parsed.base64Data, 'base64'));

  return res.json({
    success: true,
    message: 'Operation successful',
    data: {
      resumeFileName: fileName,
      resumeFileUrl: `/uploads/${storedFileName}?v=${Date.now()}`,
    },
  });
});

module.exports = {
  getResume,
  uploadResume,
};
