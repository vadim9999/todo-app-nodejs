const express = require('express');
const router = express.Router();

const test = require('../controllers/task.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', test);
module.exports = router;