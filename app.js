const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const task = require('./routes/task.route')
const user = require('./routes/user.route')
var cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const config = require("config")
if (!config.get("myprivatekey")){
    console.log("FATAL ERROR: myprivatekey is not defined");
    process. exit(1)
    
}
// Set up mongoose connection


var options = {
    user: "myUserAdmin",
    pass: "abc123"
}       

// var mongooseConnectionString = 'mongodb://localhost:27017/test?authSource=admin';

// let dev_db_url = 'mongodb://localhost:27017/test';
// let dev_db_url = 'mongodb://tester:password1@localhost:27017/myDatabase?authSource=myDatabase';
// let dev_db_url = 'mongodb+srv://testeruser123:yykyZJPF920O8xAO@cluster0-wzozh.mongodb.net/todoapp?retryWrites=true&w=majority';

const mongoDB = process.env.MONGODB_URI || dev_db_url;

console.log("key", process.env.MYPRIVATEKEY);


mongoose.connect(mongoDB, {useNewUrlParser: true})
.then(()=> console.log("connected to MongoDB"))
.catch(err => console.error("Could not connecect to MongoDB"));


mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.options('*', cors())

const corsOptions = {
    exposedHeaders: 'x-auth-token',
  };
app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Expose-Headers", "x-auth-token")
//     res.header("Access-Control-Allow-Headers", 
//     "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
   
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

//     next();
//   });
  
// ***** production
app.use(express.static(path.join(__dirname, 'views/')))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'views/', 'index.html'))
})
// *****

app.use('/tasks', task)
app.use('/user', user)
// let port = 1234;
let port = process.env.PORT;
if(port == null || port == ""){
    port = 1234
}

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
