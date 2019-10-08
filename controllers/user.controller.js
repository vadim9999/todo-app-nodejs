const User = require('../models/user.model')
const bcrypt = require("bcrypt")

// const user_create = (req, res, next) => {
//     console.log("User controller");
//     const { name, email, password } = req.body;
//     let user = new User(
//         {
//             name: name,
//             email: email,
//             password: password,
//         }
//     )

//     user.save(function (err) {
//         if (err) {
//             return next(err);
//         }
//     })

//     res.send('User created successfully!');
// }

const authorizate = async (req,res,next) =>{
    console.log("authorizate");
    const {email, password} = req.body;
    const user = await User.findOne({email: email})
    if (user === undefined) return res.status(400).send(error.details[0].message)

    const match = await bcrypt.compare(password, user.password)
    if(match) {
        const token = user.generateAuthToken()
        res.header("x-auth-token", token).send("authorization success")
    }
}


module.exports = {
    // user_create, 
    authorizate
}