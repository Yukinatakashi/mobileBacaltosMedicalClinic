// Development
const API_BASE_URL = 'http://localhost:3000';

// Service exports for server-side routes
const {
  verifyAdmin,
  getCurrentUser,
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('./api/routes/admin/user.service');

module.exports = {
  API_BASE_URL,
  verifyAdmin,
  getCurrentUser,
  listUsers,
  createUser,
  updateUser,
  deleteUser,
};

// const API_BASE_URL = 'https://your-production-api.com';