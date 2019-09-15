const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type:String, 
        required: true,
        minlength:3, 
        maxlength: 100
    },
    login: {
        type: String, 
        required:true, 
        lowercase:true,
        minlength: 5,
        maxlength:255,
        unique:true
    },
    password: {
        type: String, 
        required:true, 
        minlength:3, 
        maxlength:255
    },
        
    
    
})

module.exports = mongoose.model('User', UserSchema)
