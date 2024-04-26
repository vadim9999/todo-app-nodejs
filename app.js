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
import bcrypt from "bcrypt";
import { User, validateUser } from "./models/user.model.js";

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
  secret: privateKey,
  resave: false,
  saveUninitialized: false,
  cookie: {},
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

app.use(function (req, res, next) {
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = "";
  if (err) res.locals.message = '<p class="msg error">' + err + "</p>";
  if (msg) res.locals.message = '<p class="msg success">' + msg + "</p>";
  next();
});

// Authenticate using our plain-object database of doom!

async function authenticate(email, password, fn) {
  // if (!module.parent) console.log("authenticating %s:%s", email, pass);

  const user = await User.findOne({ email: email });

  // query the db for the given username
  if (!user) return fn(null, null);
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  try {
    const match = await bcrypt.compare(password, user.password);
    console.log("match", match);
    if (match) {
      fn(null, user);
    } else {
      fn(null, null);
    }
  } catch (err) {
    if (err) return fn(err);
  }
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = "Access denied!";
    // res.redirect("/login");
    res.sendStatus(404);
  }
}

app.get("/", function (req, res) {
  res.redirect("/login");
});

app.get("/restricted", restrict, function (req, res) {
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

app.get("/logout", function (req, res) {
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function () {
    res.redirect("/");
  });
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", function (req, res, next) {
  authenticate(req.body.email, req.body.password, function (err, user) {
    if (err) return next(err);
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function () {
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success =
          "Authenticated as " +
          user.name +
          ' click to <a href="/logout">logout</a>. ' +
          ' You may now access <a href="/restricted">/restricted</a>.';
        // res.redirect("back");
        res.sendStatus(200);
      });
    } else {
      req.session.error =
        "Authentication failed, please check your " +
        " username and password." +
        ' (use "tj" and "foobar")';
      res.redirect("/login");
    }
  });
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
