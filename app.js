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

  } else {
    console.log("Error: mongodb key undefined. Continuing execute code");
  }
}

// app.options('*', cors())

const corsOptions = {
  exposedHeaders: "authentication",
};
app.use(cors(corsOptions));

app.use(json());
app.use(urlencoded({ extended: false }));

// ***** production
// app.use(static(join(__dirname, "views/")));

// app.get(["/", "/todolist", "/signup"], function (req, res) {
//   res.sendFile(join(__dirname, "views/", "index.html"));
// });
// *****

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.use("/task", task);
app.use("/user", user);

let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 1234;
}

app.listen(PORT, () => {
  console.log("Server is up and running on PORT: " + PORT);
});
