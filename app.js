import express from "express";
import bodyParser from "body-parser";
// initialize our express app
import task from "./routes/task.route.js";
import user from "./routes/user.route.js";
import cors from "cors";
const app = express();
import mongoose from "mongoose";
// import { join } from "path";
// const config = require('config')
import dotenv from "dotenv";

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
    await mongoose.connect(mongoDB)
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

const corsOptions = {
  exposedHeaders: "x-auth-token",
};
app.use(cors(corsOptions));

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

app.use("/tasks", task);
app.use("/user", user);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 1234;
}

app.listen(port, () => {
  console.log("Server is up and running on port: " + port);
});
