const express = require('express');

const router = express.Router();

// Import the exported router from api/index.js
const apiRouter = require('./api');
router.use('/api', apiRouter);

module.exports = router;