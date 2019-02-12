const express = require('express');
const router  = express.Router();
const User = require("../models/users.js")
//const Group = require("../models/groups.js")

router.get('/', (req, res, next) => {
  console.log(req.user)
  res.render('profile/info');
});

router.get('/rankings', (req, res, next) => {
  console.log(req.user)
  res.render('profile/rankings');
});

router.get("/searchRanKing", (req,res,next) => {
  User.find().populate("ejercise")
  .then(users =>{
    const dominadas = users.map(a=>a)
    console.log(dominadas[1].ejercise);
    for(var d = 0; d < dominadas.length; d++){
      dominadas[d].ejercise.sort(ejercise.dominada);
    }
    dominadas.sort(ejercise[0].ejercise.dominada);
    console.log(users)
    res.json(dominadas)
  })
  .catch(err => console.log(err))
  res.send("hola")
})

router.get('/evolution',(req,res,next)=>{

  res.render('profile/evolution')
})

module.exports = router;