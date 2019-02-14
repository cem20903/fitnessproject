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
  successRedirect: "/group",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.post('/signup', (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({username:req.body.username,email:req.body.email,password: hash})
  .then(user => res.redirect("/profile"))
  .catch(err=> console.log(err))
});


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
