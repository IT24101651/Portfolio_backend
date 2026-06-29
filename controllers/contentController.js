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
  const merged = mergeValue(getDefaultEditableContent(), content || {});
  const sharedIconKeys = ['github', 'linkedin', 'email'];
  const detailsByKey = new Map(
    Array.isArray(merged.contact?.directDetails)
      ? merged.contact.directDetails
          .filter((item) => item && sharedIconKeys.includes(item.iconKey) && item.href)
          .map((item) => [
            item.iconKey,
            {
              label: item.label || item.iconKey,
              href: item.href,
              iconKey: item.iconKey,
            },
          ])
      : [],
  );
  const sharedLinks = sharedIconKeys.map((iconKey) => detailsByKey.get(iconKey)).filter(Boolean);

  return {
    ...merged,
    socialLinks: sharedLinks.length ? sharedLinks : merged.socialLinks,
  };
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
    { $set: { key: 'main', content } },
    { upsert: true, new: true, runValidators: false, setDefaultsOnInsert: true },
  );

  const storedContent = await getStoredContent();

  return res.json({
    success: true,
    message: 'Operation successful',
    data: normalizeContent(storedContent || content),
  });
});

module.exports = {
  getContent,
  updateContent,
  normalizeContent,
};
