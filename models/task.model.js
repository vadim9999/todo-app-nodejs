const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let TaskSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
});


// Export the model
module.exports = mongoose.model('Task', TaskSchema);