const express = require('express');
const router  = express.Router();
const ejerciseModel = require("../models/ejercise")
const User = require("../models/users.js")

router.get('/upejercise', (req, res, next) => {
  res.render('ejercise/uptrain')
});

router.post('/add-train',(req,res,next)=>{
  let array = []
  const ejercises = req.body

  for (const nom in ejercises) {
    let nombre = nom.replace(/[0-9]/g, '');
    array.push({userid: req.user.id, ejercise: {[nombre]: ejercises[nom]}})
  }

  ejerciseModel.insertMany(array)
  .then((ejercises)=>{
    const arrEj = ejercises.map(elem => elem._id)
    User.findByIdAndUpdate(req.user._id,{$push:{ejercise:{$each:arrEj}}})
    .then(user => {
      let message = "Entrenamiento subido con exito"
      res.render('profile/info',{message})
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

module.exports = router;

// {$push:{ejercise:{$each:['5c62f162bf9e974cf9fb7d69','5c62f162bf9e974cf9fb7d6a']}}}
// 5c62f162bf9e974cf9fb7d6b,5c62f162bf9e974cf9fb7d6c