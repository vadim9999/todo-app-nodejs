const express = require('express');
const router = express.Router();

const { task_create,
        task_details,
        tasks_update,
        task_delete,
        get_all_tasks } = require('../controllers/task.controller');

// a simple test url to check that all of our files are communicating correctly.
// router.get('/test', test);
router.post('/create', task_create); 
router.get('/:id', task_details)
router.put('/:id/update', tasks_update)
router.delete('/:id/delete', task_delete)
router.get('/all_tasks_by_id/:login_id',get_all_tasks)

module.exports = router;