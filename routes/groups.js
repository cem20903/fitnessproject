const express = require('express');
const router  = express.Router();
const User = require("../models/users.js")
const Group = require("../models/groups.js")

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get("/",ensureLoggedIn('/login'), (req,res,next) => {
  Group.find()
  .then(groups => {
    for(var g = 0; g < groups.length; g++){
      if(req.user.groups.indexOf(groups[g]._id) != -1) groups[g].user = true;
    }
    res.render("group/groups",{groups, user: req.user})
  })
  .catch(err => console.log(err))
})
router.get("/new",ensureLoggedIn('/login'), (req,res,next) => {
  res.render("group/newGroup")
})
router.post("/new",ensureLoggedIn('/login'), (req,res,next) => {
  Group.create({name:req.body.name})
  .then(group => {
    User.findByIdAndUpdate(req.user.id,{$push:{groups:group._id.toString()}})
    .then(user => res.redirect("/group"))
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})
router.get("/add/:id",ensureLoggedIn('/login'), (req,res,next) => {
  Group.findByIdAndUpdate(req.params.id,{$push:{members:req.user.id}})
  .then(groups => {
    User.findByIdAndUpdate(req.user.id,{$push:{groups:req.params.id}})
    .then(user => res.redirect("/group"))
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})
router.get("/del/:id",ensureLoggedIn('/login'), (req,res,next) => {
  Group.findByIdAndUpdate(req.params.id,{$pull:{members:req.user.id}})
  .then(groups => {
    User.findByIdAndUpdate(req.user.id,{$pull:{groups:req.params.id}})
    .then(user => res.redirect("/group"))
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

router.get("/info/:id",ensureLoggedIn('/login'),(req,res,next)=>{
  
  User.find({groups:req.params.id})
  .then(users => res.render("group/info",{users}))
  .catch(err => console.log(err))

})

module.exports = router;