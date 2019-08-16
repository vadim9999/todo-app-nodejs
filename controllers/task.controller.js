const Task = require('../models/task.model');

//Simple version, without validation or sanitation

const task_create = function (req, res, next) {
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
module.exports = { 
    task_create,
    task_details 
};