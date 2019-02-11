const express = require('express');
const router  = express.Router();
const passport   = require('passport');
const User = require("../models/users.js")
const bcrypt  = require('bcrypt');

const salt = bcrypt.genSaltSync(10);
    
/* GET home page */
router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.post('/signup', (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({username:req.body.name,email:req.body.email,password: hash})
  .then(user => res.redirect("/login"))
  .catch(err=> console.log(err))
});

module.exports = router;
