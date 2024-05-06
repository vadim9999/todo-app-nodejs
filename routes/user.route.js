import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import bcrypt from "bcrypt";
import { User, validateUser } from "../models/user.model.js";
import jwt from "jsonwebtoken";
// import { authorizate } from "../controllers/user.controller.js";

const router = Router();

router.get("/:id", verifyToken, async (req, res) => {
  console.log("/current");

  const user = await User.findById(req.params.id).select("-password");
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
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user === null) return res.status(400).send("user not found");

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(404).send("not found");

  jwt.sign(
    { user: { name: user.name, email: user.email } },
    process.env.MYPRIVATEKEY,
    { expiresIn: "1h" },
    (err, token) => {
      if (err) {
        res.status(500).send("Error generating token");
      } else {
        res.json({ token });
      }
    }
  );
});

export default router;
