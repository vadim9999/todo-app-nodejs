const express = require('express');
const router = express.Router();

const {
    user_create
} = require('../controllers/user.controller')

router.post('/create_user',user_create)

module.exports = router;