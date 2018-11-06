const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    ISBN: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: String
});

const Book = mongoose.model('book', BookSchema);

module.exports = Book;