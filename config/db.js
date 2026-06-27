const mongoose = require('mongoose');

function getMongoHost(uri) {
  const atIndex = uri.indexOf('@');
  if (atIndex === -1) {
    return '';
  }

  return uri.slice(atIndex + 1).split('/')[0];
}

function buildMongoErrorMessage(error) {
  const uri = process.env.MONGO_URI || '';
  const host = getMongoHost(uri);

  if (/[<>]/.test(uri)) {
    return [
      'MONGO_URI still contains placeholder characters (< or >).',
      'Replace it with a real MongoDB connection string before starting the server.',
      'If your username or password contains reserved characters such as :, @, /, or !, percent-encode them.',
    ].join(' ');
  }

  if (error?.message?.includes('querySrv') || error?.message?.includes('ENOTFOUND') || error?.message?.includes('ECONNREFUSED')) {
    return [
      `Unable to connect to MongoDB at ${host || 'the configured host'}.`,
      'If you are using MongoDB Atlas, check the cluster is running, your IP is allowlisted, and the credentials in MONGO_URI are correct.',
      'If you want a local database for development, point MONGO_URI at a local MongoDB instance instead.',
    ].join(' ');
  }

  return error?.message || 'Failed to connect to MongoDB';
}

async function connectDB() {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required');
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    throw new Error(buildMongoErrorMessage(error));
  }
}

module.exports = connectDB;
