const express = require('express');
const router  = express.Router();
const ejerciseModel = require("../models/ejercise")
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost/fitnessproject', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

/* GET home page */
router.get('/upejercise', (req, res, next) => {
  res.render('ejercise/uptrain')
});


router.post('/add-train',(req,res,next)=>{
  console.log(req.body)
  const ejercises = req.body

  

  ejerciseModel.create({userid: "1234", ejercise: ejercises})
  .then((bien)=>{

    console.log(bien)

  })
.catch(err=>{
  console.log(err)
})


})

router.use('/', require('./auth'));

module.exports = router;
