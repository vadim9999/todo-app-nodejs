const express = require('express');
const router = express.Router();

const task_controller = require('../controllers/task.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', task_controller.test);
module.exports = router;