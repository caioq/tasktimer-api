const express = require('express');

const workspaceController = require('../controllers/workspace');

const router = express.Router();

// POST /workspace/add-task
router.post('/add-task', workspaceController.postAddTask);

// PATCH /workspace/:taskid/stop-task
router.patch('/:taskid/stop', workspaceController.patchStopTask);

// GET /workspace/:userid/tasks
router.get('/:userid/tasks', workspaceController.getTasks);

// GET /workspace/:userid/finished-tasks
router.get('/:userid/finished-tasks', workspaceController.getFinishedTasks);

// GET /workspace/:userid/running-task
router.get('/:userid/running-task', workspaceController.getRunningTask);

// GET /workspace/:userid/projects
router.get('/:userid/projects', workspaceController.getProjects);


module.exports = router;