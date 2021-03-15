const express = require('express');

const router = express.Router();

// Add in the other routers here:
// eg. const todos = require('./todos')
//router.use('/todos', todos)

// Test end point to verify the router paths work.
router.get('/', (req, res) => {
  res.json({
    name: 'This endpoint is /api',
    status: 'Working',
  });
});

module.exports = router;
