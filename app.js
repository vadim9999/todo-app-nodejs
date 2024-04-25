import express from "express";
import bodyParser from "body-parser";
// initialize our express app
import task from "./routes/task.route.js";
import user from "./routes/user.route.js";
import cors from "cors";
import mongoose from "mongoose";
// import { join } from "path";
// const config = require('config')
import dotenv from "dotenv";
import session from "express-session";

const app = express();

const { json, urlencoded } = bodyParser;

// Set up mongoose connection
const mode = process.env.NODE_ENV || "development";

console.log("Mode: ", mode);

if (mode !== "production") {
  try {
    const result = dotenv.config();
    if (result.error) {
      throw result.error;
    }
  } catch (e) {
    console.log(".env file not found");
  }
}

let privateKey = process.env.MYPRIVATEKEY;
let mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));

if (privateKey === undefined || privateKey === "") {
  console.log("Error private key now found. Exit");
  process.exit(1);
}

async function main() {
  if (mongoDB !== undefined && mongoDB !== "") {
    await mongoose
      .connect(mongoDB)
      .then(() => console.log("connected to MongoDB"))
      .catch((err) => console.error("Could not connecect to MongoDB"));

    // Promise = global.Promise;
    // const db = connection;
    // db.on("error", console.error.bind(console, "MongoDB connection error:"));
  } else {
    console.log("Error: mongodb key undefined. Continuing execute code");
  }
}

// app.options('*', cors())

// const corsOptions = {
//   exposedHeaders: "x-auth-token",
// };
// app.use(cors(corsOptions));

app.use(json());
app.use(urlencoded({ extended: false }));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Expose-Headers", "x-auth-token")
//     res.header("Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");

//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

//     next();
//   });

// ***** production
// app.use(static(join(__dirname, "views/")));

// app.get(["/", "/todolist", "/signup"], function (req, res) {
//   res.sendFile(join(__dirname, "views/", "index.html"));
// });
// *****

var sess = {
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: {},
};

// if (app.get("env") === "production") {
app.set("trust proxy", 1); // trust first proxy
sess.cookie.secure = true; // serve secure cookies
// }

app.use(session(sess));

app.get("/", function (req, res, next) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write("<p>views: " + req.session.views + "</p>");
    res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
    res.end();
  } else {
    req.session.views = 1;
    res.end("welcome to the session demo. refresh!");
  }
});

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.use("/task", task);
app.use("/user", user);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 1234;
}

app.listen(port, () => {
  console.log("Server is up and running on port: " + port);
});
