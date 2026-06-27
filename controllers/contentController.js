const SiteContent = require('../models/SiteContent');
const asyncHandler = require('../utils/asyncHandler');
const getDefaultEditableContent = require('../utils/defaultEditableContent');

function mergeValue(defaultValue, incomingValue) {
  if (Array.isArray(defaultValue)) {
    return Array.isArray(incomingValue) ? incomingValue : defaultValue;
  }

  if (defaultValue && typeof defaultValue === 'object') {
    const incomingObject = incomingValue && typeof incomingValue === 'object' ? incomingValue : {};
    const merged = { ...defaultValue };

    Object.keys(defaultValue).forEach((key) => {
      merged[key] = mergeValue(defaultValue[key], incomingObject[key]);
    });

    return merged;
  }

  return incomingValue ?? defaultValue;
}

function normalizeContent(content) {
  return mergeValue(getDefaultEditableContent(), content || {});
}

async function getStoredContent() {
  const document = await SiteContent.findOne({ key: 'main' }).lean();
  return document?.content || null;
}

const getContent = asyncHandler(async (req, res) => {
  const storedContent = await getStoredContent();
  const content = normalizeContent(storedContent);

  return res.json({
    success: true,
    message: 'Operation successful',
    data: content,
  });
});

const updateContent = asyncHandler(async (req, res) => {
  const incomingContent = req.body?.content;

  if (!incomingContent || typeof incomingContent !== 'object' || Array.isArray(incomingContent)) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      data: { errors: ['content must be an object'] },
    });
  }

  const content = normalizeContent(incomingContent);

  await SiteContent.findOneAndUpdate(
    { key: 'main' },
    { key: 'main', content },
    { upsert: true, new: true, runValidators: false },
  );

  return res.json({
    success: true,
    message: 'Operation successful',
    data: content,
  });
});

module.exports = {
  getContent,
  updateContent,
  normalizeContent,
};
