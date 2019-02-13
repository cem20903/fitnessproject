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
  console.log("--------------");
  console.log(req.query);
  if(req.query && req.query.id != "global") findId = {groups: req.query.id}
  User.find(findId)
  .then(users =>{
    const arrUsers = users.map(elem => elem._id)
    Ejercise.find({userid:{$in:arrUsers}},{},{sort:{"ejercise.dominadas.1":-1}})
    .then(ejer => console.log(JSON.stringify(ejer)))

    // const dominadas = users.map(a=>a)
    // console.log(dominadas[1].ejercise);
    // for(var d = 0; d < dominadas.length; d++){
    //   dominadas[d].ejercise.sort(ejercise.dominada);
    // }
    // dominadas.sort(ejercise[0].ejercise.dominada);
    // console.log(users)
    // res.json(dominadas)
    res.send("hola")
  })
  .catch(err => console.log(err))
})

router.get('/evolution',(req,res,next)=>{

  res.render('profile/evolution')
})

module.exports = router;