const express = require('express');

const router = express.Router();

router.use('/journal', require('./journal'));
router.use('/dashboard', require('./dashboard'));
router.use('/todo', require('./todo'));
router.use('/habittracker', require('./habittracker'));
router.use('/calendar', require('./calendar'));
router.use('/text', require('./text'));

module.exports = router;
