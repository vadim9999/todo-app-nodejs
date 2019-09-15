const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    login_id: {type: mongoose.Schema.Types.ObjectId, required:true, lowercase: true},
    name: {type: String, required: true, max: 100},
    completed: {type: Boolean, required: true},
    date: {type: Date, required:true},
});


// Export the model
module.exports = mongoose.model('Task', TaskSchema);
