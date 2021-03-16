const express = require('express');

const router = express.Router();

router.use('/journal', require('./journal'));
router.use('/todolist', require('./todolist'));
router.use('/habittracker', require('./habittracker'));
router.use('/calendar', require('./calendar'));
router.use('/text', require('./text'));

module.exports = router;
