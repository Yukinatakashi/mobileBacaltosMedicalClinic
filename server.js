// server.js (root)
const express = require('express');
const cors = require('cors');

// Load .env from root (no need for path hacks if .env is here)
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Medical App API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Medical App API',
    version: '1.0.0',
    status: 'Running',
    endpoints: [
      'GET / - Root endpoint',
      'GET /health - Health check',
      'GET /api - API information'
    ]
  });
});

// Basic API info endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Medical App API',
    version: '1.0.0',
    endpoints: [
      'GET /health - Health check',
      'GET /api - API information'
    ]
  });
});

// Import API routes (now correct because server.js is in root)
const loginRoutes = require('./src/api/routes/admin/loginuser.route');
const registerRoutes = require('./src/api/routes/admin/registeruser.route');

// Mount API routes
app.use('/login', loginRoutes);  // <--  login route
app.use('/register', registerRoutes); // <-- public register

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Medical App API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
