const Institution = require('../models/Institution');
const Book = require('../models/Book');


exports.book = (req, res) => {
  // Grab institute id from user object
  let instID = req.user.institution;

  // find all books for a users institution
  Institution.findById(instID)
    .populate('books')
    .exec(function(err, inst) {
      if (err) return res.send(err);
      res.send(inst.books);
    });
};