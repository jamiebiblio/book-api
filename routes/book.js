const express = require('express')
const router = express.Router();
const passportService = require("../services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });

const BookController = require('../controllers/books_controller');

router.get('/books', requireAuth, BookController.book);

module.exports = router;