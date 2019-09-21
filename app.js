const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const task = require('./routes/task.route')
const user = require('./routes/user.route')
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');

var options = {
    user: "myUserAdmin",
    pass: "abc123"
}       

// var mongooseConnectionString = 'mongodb://localhost:27017/test?authSource=admin';

// let dev_db_url = 'mongodb://localhost:27017/test';
let dev_db_url = 'mongodb://tester:password1@localhost:27017/myDatabase?authSource=myDatabase';
// let dev_db_url = 'mongodb://someuser:abcd1234@ds123619.mlab.com:23619/productstutorial';

const mongoDB = process.env.MONGODB_URI || dev_db_url;


mongoose.connect(mongoDB, {useNewUrlParser: true});

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    next();
  });
  
app.use('/tasks', task,user)
let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
