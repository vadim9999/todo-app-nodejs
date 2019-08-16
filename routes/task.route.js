const express = require('express');
const router = express.Router();

const { task_create, task_details } = require('../controllers/task.controller');

// a simple test url to check that all of our files are communicating correctly.
// router.get('/test', test);
router.post('/create', task_create); 
router.get('/:id', task_details)
// router.put('/:id/update', tasks_update)
module.exports = router;