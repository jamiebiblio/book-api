const Book = require('../Book');
const Institution = require('../Institution');
const mongoose = require('mongoose');
const config = require('../../config');

//DB setup
mongoose.connect(
  config.MONGO_URI,
  { useNewUrlParser: true }
)
mongoose.connection
.once("open", () => {
  Institution.findOne({name: 'acme'}).then(institute => {
    const newBook = new Book({
        ISBN: '101',
        title: 'Psychology 101',
        author: 'Richard Richardson III'
    })

    newBook.save().then(book => {
        institute.books.push(book._id)
        institute.save();
    })
  }).catch(err => console.log(err));
});


