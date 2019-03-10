const express = require('express');
const router  = express.Router();
const ejerciseModel = require('../models/ejercise')
const user = require('../models/users')

router.get('/weight',(req,res,next)=>{

res.render('profile/weight')

})

router.post('/weight',(req,res,next)=>{
 
  req.query.weight = parseFloat(req.query.weight)
  let id = req.query._id
  let newWeight = req.query
  
  
  user.findByIdAndUpdate(req.user._id, { $push: { weight:  newWeight  } })
  .then(data=>{
  })

})

router.get('/weightEvo',(req,res,next)=>{

  
  
  user.findById(req.user._id)
  .then(data=>{
    res.json(data)
  })

})


router.get('/info', (req,res,next)=>{

  const from = req.query.datefrom.toString()
  const to = req.query.dateto.toString()



  if(req.query.disciplina === "peso"){

user.findById(req.user._id)
.then(data=>{
 res.json(data)
})
  } else {
  
  const disciplina = `ejercise.${req.query.disciplina}`
  ejerciseModel.find({$and: [{[disciplina]: {$exists: true}}, {date:{$gte:from}}
,{date:{$lte:to}}]})
  .then(data=>{
    res.json(data)
  })
}

})





module.exports = router;