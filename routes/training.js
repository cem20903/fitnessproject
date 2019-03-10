const express = require('express');
const router  = express.Router();
const User = require("../models/users.js")
const Group = require("../models/groups.js")
const Ejercise = require("../models/ejercise.js")


router.post('/',(req,res,next)=>{
  console.log("Post")
  Ejercise.find({userid:req.user._id})
.then(data=>{
  res.json(data)
})

})

router.get('/',(req,res,next)=>{
Ejercise.find({userid:req.user._id})
.then(data=>{
  let dataArray = data.map((train)=>{
    return train.date.toString().split(" ")[0] + train.date.toString().split(" ")[1] + train.date.toString().split(" ")[2]
  }) 

 
  uniqueArray = dataArray.filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
})
  

  for(let a = 0; a < dataArray.length;a++){
    data.forEach(train=>{
  let fecha = train.date.toString().split(" ")[0] + train.date.toString().split(" ")[1] + train.date.toString().split(" ")[2]
      if(dataArray[a] === fecha ){

      //  ordenado.push(train)
      } 
    })

  }


  res.render('train/training')

})


})




module.exports = router;