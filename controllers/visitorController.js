const Visitor = require('../models/Visitor');
const asyncHandler = require('../utils/asyncHandler');

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return req.ip || req.socket?.remoteAddress || 'Unknown';
}

function getCountry(req) {
  return (
    req.headers['x-vercel-ip-country'] ||
    req.headers['cf-ipcountry'] ||
    req.headers['x-country'] ||
    'Unknown'
  );
}

function getBrowser(userAgent = '') {
  const value = userAgent.toLowerCase();

  if (value.includes('edg/')) return 'Edge';
  if (value.includes('chrome/') && !value.includes('edg/')) return 'Chrome';
  if (value.includes('firefox/')) return 'Firefox';
  if (value.includes('safari/') && !value.includes('chrome/')) return 'Safari';
  if (value.includes('trident/') || value.includes('msie')) return 'Internet Explorer';

  return 'Unknown';
}

const recordVisitor = asyncHandler(async (req, res) => {
  const userAgent = req.headers['user-agent'] || '';
  const visitor = await Visitor.create({
    ipAddress: getClientIp(req),
    country: getCountry(req),
    browser: getBrowser(userAgent),
    userAgent,
    visitDate: new Date(),
  });

  return res.status(201).json({
    success: true,
    message: 'Operation successful',
    data: visitor,
  });
});

module.exports = {
  recordVisitor,
};

