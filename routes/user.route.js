const express = require('express');
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt")
const { User, validate } = require("../models/user.model")
const {
    user_create
} = require('../controllers/user.controller')
const router = express.Router();

router.get("/current", auth, async (req, res) => {
    console.log("current");
    
    const user = await User.findById(req.user._id).select("-password");
    res.send(user)

})

router.post("/create_user", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("user already registered.")

    user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    })
    user.password = await bcrypt.hash(user.password, 10)
    await user.save()

    const token = user.generateAuthToken()
    res.header("x-auth-token", token).send({
        _id: user.id,
        name: user.name,
        email: user.email
    })

})
 

    // router.post('/create_user', user_create)

    module.exports = router;