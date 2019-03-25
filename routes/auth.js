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
  console.log(req.body)

  let iron = []
                     

  let {username,email,genre,weight} = req.body

 if(genre === "male"){
  iron = [+weight,10,weight*0.75,weight*1.8,weight*1.5,200,200,15,25,75,20]
 } else {
  iron = [weight*0.5,8,weight*0.35,weight*1.2,weight*0.9,200,200,18,30,75,20]

 }
 let listado = ["Press banca",
 "Dominadas",
 "Press Militar",
 "Peso Muerto",
 "Sentadilla",
 "Sentadilla (R)",
 "Flexiones (R)",
 "Velocidad",
 "Aerobico",
 "Peso",
 "Grasa"
 ]
 
 let records = {
  listado:listado, 
  iron:iron,
 }

  var d = new Date();
  d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2)
  let completeWeight = [+weight,d]
  const hash = bcrypt.hashSync(req.body.password, salt);
  User.create({username,email,password: hash,genre,weight:completeWeight,records})
  .then(user => res.redirect("/profile"))
  .catch(err=> console.log(err))
});


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
