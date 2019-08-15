const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const task = require('./routes/task.route')
const app = express();

app.use('/tasks', task)
let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});