const User = require('../models/user.model')

const user_create = (req, res, next) => {
    console.log("User controller");
    const { name, login, password } = req.body;
    let user = new User(
        {
            name: name,
            login: login,
            password: password,
        }
    )

    user.save(function (err) {
        if (err) {
            return next(err);
        }
    })

    res.send('User created successfully!');
}

module.exports = {
    user_create
}