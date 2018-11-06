const express = require('express')
const router = express.Router();
const passportService = require("../services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

const UserController = require('../controllers/users_controller');

router.post('/create', UserController.create);

router.post("/signin", requireSignin, UserController.signin);

module.exports = router;