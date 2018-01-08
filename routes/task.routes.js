var express = require('express');
var router = express.Router();
var task = require('../api/task.api');

//API
router.post('/create', task.createTask);
router.get('/', task.getTasks);
router.get('/destroy:/id', task.deleteTask);
router.post('/update', task.updateTask);

module.exports = router;