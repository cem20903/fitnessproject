const express = require('express');
const router  = express.Router();
const User = require("../models/users.js")
const Group = require("../models/groups.js")
const Ejercise = require("../models/ejercise.js")

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/',ensureLoggedIn('/login'), (req, res, next) => {
  res.render('profile/info');
});

router.get('/rankings',ensureLoggedIn('/login'), (req, res, next) => {
  Group.find({members:req.user._id})
  .then(groups => res.render('profile/rankings',{groups}))
  .catch(err => console.log(err))
});


router.get('/profile',(req,res,next)=>{

  let goalWeight = req.user.goalWeight
  let weight = req.user.weight
  let actualWeight = weight[weight.length-1].weight
  let dateActualWeight = weight[weight.length-1].date
 
 
 
  res.render('profile/settings',{goalWeight: goalWeight,weight: actualWeight,dateActualWeight: dateActualWeight})

})

router.post('/updateGoal',(req,res,next)=>{
  User.findByIdAndUpdate(req.user._id,{goalWeight: req.body.goalWeight})
  .then((data)=>{
    
     res.redirect('profile')
  })

})


router.get("/searchRanKing", (req,res,next) => {
  let findId = {}
  let sort1 = `ejercise.${req.query.type}.0` 
  if(req.query && req.query.id != "global") findId = {groups: req.query.id}
  User.find(findId)
  .then(users =>{
    const arrUsers = users.map(elem => elem._id)
    let findE = `ejercise.${req.query.type}`
    let resArr = [];
    Ejercise.find({$and:[{userid:{$in:arrUsers}},{[findE]:{$exists:true}}]},{},{sort:{[sort1]:-1}})
    .then(ejer => {
      let checkIds = []
      ejer.forEach(elem => {
        if(checkIds.indexOf(elem.userid) == -1 && elem.ejercise[req.query.type][1] == 1){
          for(var j = 0; j < users.length; j++){
            if(users[j]._id == elem.userid){
              checkIds.push(elem.userid)
              resArr.push({name: users[j].username, userId: elem.userid, ejer: elem.ejercise[req.query.type]})
            }
          }
        }
      })
      res.json(resArr);
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

router.get('/evolution',(req,res,next)=>{

  res.render('profile/evolution')
})

module.exports = router;