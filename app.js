const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const task = require('./routes/task.route')
const user = require('./routes/user.route')
var cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const config = require('config')


// Set up mongoose connection

let mongoDB = process.env.MONGODB_URI;

if (mongoDB == null || mongoDB == '') {

    if (config.get("MONGODB_URI") && config.get("MONGODB_URI") !== '') {
        mongoDB = config.get("MONGODB_URI")
    } else {
        console.log("FATAL ERROR: myprivatekey is not defined");
        process.exit(1)
    }
} else {
    console.log("Error MONGODB_URI is not defined");

}

mongoose.connect(mongoDB, { useNewUrlParser: true })
    .then(() => console.log("connected to MongoDB"))
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
app.use(bodyParser.urlencoded({ extended: false }));

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

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/', 'index.html'))
})
// *****

app.use('/tasks', task)
app.use('/user', user)

let port = process.env.PORT;
if (port == null || port == "") {
    port = 1234
}

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
