const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const task = require('./routes/task.route')
const user = require('./routes/user.route')
var cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const path = require('path')
// const config = require('config')


// Set up mongoose connection
const mode = process.env.NODE_ENV || 'development'

console.log("Mode: ", mode);

if (mode !== 'production') {
    try {
        const result = require('dotenv').config();
        if (result.error) {
            throw result.error
        }

    } catch (e) {
        console.log(".env file not found");
    }

}

let privateKey = process.env.MYPRIVATEKEY;
let mongoDB = process.env.MONGODB_URI;


if (privateKey === undefined || privateKey === '') {
    console.log("Error private key now found. Exit");
    process.exit(1)
}

if (mongoDB !== undefined && mongoDB !== '') {

    mongoose.connect(mongoDB, { useNewUrlParser: true })
        .then(() => console.log("connected to MongoDB"))
        .catch(err => console.error("Could not connecect to MongoDB"));


    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
} else {
    console.log("Error: mongodb key undefined. Continuing execute code");
}



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
    console.log('Server is up and running on port: ' + port);
});
