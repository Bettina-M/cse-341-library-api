const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author:{type:String, required: true},
    genre: {type: String, required: true},
    publishedYear: {type:Number, required: false},
    available: {type:Boolean, required: false}
})

module.exports = mongoose.model('Book', userSchema);
