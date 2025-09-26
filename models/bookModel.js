const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author:{type:String, required: true},
    genre: {type: String, required: true},
    publishedYear: {type:Number, required: false},
    available: {type:Boolean, required: false},
    isbn: { type: String, required: true, unique: true },
    pages: { type: Number, required: true }
})

module.exports = mongoose.model('Book', bookSchema);
