const mongoose = require ('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    description: { 
        type: String,
        required: true, 
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date, 
        required: true,
    }, 
})

const todo = mongoose.model('todo', schema);
module.exports = todo;