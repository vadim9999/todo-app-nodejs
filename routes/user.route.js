import { Router } from "express";
import auth from "../middleware/auth.js";
import bcrypt from "bcrypt";
import { User, validateUser } from "../models/user.model.js";
// import { authorizate } from "../controllers/user.controller.js";
const router = Router();

router.get("/current", auth, async (req, res) => {
  console.log("/current");

  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/create", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already registered.");

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });

  try {
    user.password = await bcrypt.hash(user.password, 10);
    user.save();
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }

  // const token = user.generateAuthToken();
  // res.header("x-auth-token", token).send({
  //   _id: user.id,
  //   name: user.name,
  //   email: user.email,
  // });
});

router.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user === null) return res.status(400).send("user not found");

  const match = await bcrypt.compare(password, user.password);
  console.log("match", match);
  if (!match) return res.status(404).send("not found");

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user.id,
    name: user.name,
    email: user.email,
  });
});

export default router;
