const Task = require('../models/task.model');

//Simple version, without validation or sanitation
// creates document in mongodb

const task_create = function (req, res, next) {
    console.log("Controller__task_create");
    console.log(req.body.name);
    console.log(req.body);
    
    let task = new Task(
        {
            name: req.body.name,
            price:req.body.price
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
    Task.findById(req.params.id, function (err, task) {
        if (err) return next(err);
        res.send(task)
    })
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
    task_delete 
};