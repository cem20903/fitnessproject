const express = require('express');
const router  = express.Router();
const User = require("../models/users.js")
const Group = require("../models/groups.js")
const Ejercise = require("../models/ejercise.js")

router.get('/', (req, res, next) => {
  res.render('profile/info');
});

router.get('/rankings', (req, res, next) => {
  Group.find({members:req.user._id})
  .then(groups => res.render('profile/rankings',{groups}))
  .catch(err => console.log(err))
});

router.get("/searchRanKing", (req,res,next) => {
  let findId = {}
  let sort1 = `ejercise.${req.query.type}.1` 
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
        if(checkIds.indexOf(elem.userid) == -1){
          for(var j = 0; j < users.length; j++){
            if(users[j]._id == elem.userid){
              checkIds.push(elem.userid)
              resArr.push({name: users[j].username, userId: elem.userid, ejer: elem.ejercise})
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