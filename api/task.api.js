var taskService = require('../services/task.service');


function createTask(req, res) {
    let task = {
        name: req.body.name,
        dueDate: req.body.dueDate,
        priority: req.body.priority
    }
    taskService.createTask(task)
    .then(taskStored => {
        if(taskStored) {
            res.status(200).send(taskStored);
        }
    })
    .catch(error => {
        res.status(500).send({status: 500, errors: error.errors});
    })
}


function getTasks(req, res) {
    taskService.getTasks()
    .then(tasks => {
        console.log("then");
        if(tasks) {
            res.status(200).send(tasks);
        }
    })
    .catch(error => {
        if(error) {
            res.status(500).send({status: 500, message: "No existen tasks"});
        }
    });
}


function deleteTask(req, res) {
    let taskId = req.params.id;
    if(!taskId) {
        res.status(400).send({status: 400, validationErrors: "No id provided."});
    }
    taskService.deleteTask(taskId)
    .then(taskDeleted => {
        res.status(200).send(taskDeleted);
    })
    .catch(error => {
        res.status(404).send({status: 404, validationErrors: "id is invalid"});
    });
}


function updateTask(req, res) {
    let task = req.body.task;
    let taskId = req.body.taskId;
    taskService.updateTask(taskId, task)
    .then(taskUpdated => {
        res.status(200).send(taskUpdated);
    })
    .catch(error => {
        res.status(500).send({status: 500, error});
    });
}



module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}