function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidUrl(value) {
  if (!value) {
    return true;
  }

  try {
    // eslint-disable-next-line no-new
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function normalizeTechnologies(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeString).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map(normalizeString)
      .filter(Boolean);
  }

  return [];
}

function validateContactInput(req, res, next) {
  const errors = [];
  const name = normalizeString(req.body.name);
  const email = normalizeString(req.body.email).toLowerCase();
  const subject = normalizeString(req.body.subject);
  const message = normalizeString(req.body.message);

  if (!name) errors.push('Name is required.');
  if (!email) errors.push('Email is required.');
  if (email && !isValidEmail(email)) errors.push('Please provide a valid email address.');
  if (!subject) errors.push('Subject is required.');
  if (!message) errors.push('Message is required.');

  req.body = { ...req.body, name, email, subject, message };

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      data: { errors },
    });
  }

  return next();
}

function validateLoginInput(req, res, next) {
  const errors = [];
  const email = normalizeString(req.body.email).toLowerCase();
  const password = normalizeString(req.body.password);

  if (!email) errors.push('Email is required.');
  if (email && !isValidEmail(email)) errors.push('Please provide a valid email address.');
  if (!password) errors.push('Password is required.');

  req.body = { ...req.body, email, password };

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      data: { errors },
    });
  }

  return next();
}

function validateProjectInput(req, res, next) {
  const errors = [];
  const title = normalizeString(req.body.title);
  const description = normalizeString(req.body.description);
  const image = normalizeString(req.body.image);
  const technologies = normalizeTechnologies(req.body.technologies);
  const githubLink = normalizeString(req.body.githubLink);
  const liveDemo = normalizeString(req.body.liveDemo);
  const category = normalizeString(req.body.category);

  if (!title) errors.push('Title is required.');
  if (!description) errors.push('Description is required.');
  if (!image) errors.push('Image is required.');
  if (!technologies.length) errors.push('At least one technology is required.');
  if (githubLink && !isValidUrl(githubLink)) errors.push('GitHub link must be a valid URL.');
  if (liveDemo && !isValidUrl(liveDemo)) errors.push('Live demo must be a valid URL.');
  if (!category) errors.push('Category is required.');

  req.body = {
    ...req.body,
    title,
    description,
    image,
    technologies,
    githubLink,
    liveDemo,
    category,
  };

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      data: { errors },
    });
  }

  return next();
}

module.exports = {
  validateContactInput,
  validateLoginInput,
  validateProjectInput,
};
