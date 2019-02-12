const express = require('express');
const router  = express.Router();
const ejerciseModel = require("../models/ejercise")
const mongoose = require('mongoose')



/* GET home page */
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
  .then((bien)=>{
    let message = "Entrenamiento subido con exito"
    res.render('profile/info',{message})
  })
.catch(err=>{
  console.log(err)
})


// a = 1
// b = 2
// c = 3




})

router.use('/', require('./auth'));

module.exports = router;
