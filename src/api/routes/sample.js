const express = require('express');
const router = express.Router();

// Sample route file - replace with your actual routes
// This demonstrates the basic structure for creating API routes

// GET /api/sample - Sample GET endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Sample route is working!',
    timestamp: new Date().toISOString(),
    data: {
      id: 1,
      name: 'Sample Data',
      description: 'This is a sample response'
    }
  });
});

// GET /api/sample/:id - Sample GET with parameter
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  res.json({
    success: true,
    message: `Sample route with ID: ${id}`,
    data: {
      id: parseInt(id),
      name: 'Sample Item',
      createdAt: new Date().toISOString()
    }
  });
});

// POST /api/sample - Sample POST endpoint
router.post('/', (req, res) => {
  const requestData = req.body;
  
  res.status(201).json({
    success: true,
    message: 'Sample data created successfully',
    data: {
      id: Date.now(),
      ...requestData,
      createdAt: new Date().toISOString()
    }
  });
});

// PUT /api/sample/:id - Sample PUT endpoint
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  
  res.json({
    success: true,
    message: `Sample data with ID ${id} updated successfully`,
    data: {
      id: parseInt(id),
      ...updateData,
      updatedAt: new Date().toISOString()
    }
  });
});

// DELETE /api/sample/:id - Sample DELETE endpoint
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  res.json({
    success: true,
    message: `Sample data with ID ${id} deleted successfully`,
    data: {
      id: parseInt(id),
      deleted: true,
      deletedAt: new Date().toISOString()
    }
  });
});

module.exports = router;
