const Task = require('../models/task.model');
const moment = require('moment')
//Simple version, without validation or sanitation
// creates document in mongodb

const task_create = function (req, res, next) {
    console.log("Controller__task_create");
    console.log(req.body.name);
    console.log(req.body);
    const { name, completed, date, login_id} = req.body;
    let task = new Task(
        {   login_id: login_id,
            name: name,
            completed: completed,
            date: date,
            
        }
    );

    task.save(function (err) {
        if (err){
            return next(err);
        }
    })
    res.send('Task Created successfully!');
};

const task_details = function (req, res){
    console.log("task_details");
    
     Task.findById(req.params.id, function (err, task) {
        if (err) return next(err);
        res.send(task)
    })
}

const get_all_tasks = (req, res)=>{
    console.log("get all tasks");
    console.log(req.params.login_id);
    
    Task.find({login_id: req.params.login_id}, function (err, tasks) {
        if (err) return next(err);
        res.send(tasks)
    }).select("name completed date")
}

const tasks_update = function (req, res){
    console.log(req.body);
    
    Task.findByIdAndUpdate(req.params.id, {$set:req.body}, function (err, task) {
        if (err) return next(err);
        res.send('Tasks are updated')
    })
}

const task_delete = function (req, res){
    Task.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
}

module.exports = { 
    task_create,
    task_details,
    tasks_update,
    task_delete,
    get_all_tasks 
};