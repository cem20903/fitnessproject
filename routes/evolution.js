const express = require('express');
const router  = express.Router();
const ejerciseModel = require('../models/ejercise')


router.get('/info', (req,res,next)=>{

  const from = req.query.datefrom.toString()
  const to = req.query.dateto.toString()



  
  const disciplina = `ejercise.${req.query.disciplina}`

 // {$and: [{[disciplina]: {$exists: true}}, {date:{$gt:Date('2019-02-11 00:00:00.000')}}]}

  ejerciseModel.find({$and: [{[disciplina]: {$exists: true}}, {date:{$gte:from}}
,{date:{$lte:to}}]})
  .then(data=>{
    res.json(data)
  })


})





module.exports = router;