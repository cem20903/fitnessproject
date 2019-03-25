const express = require('express');
const router  = express.Router();
const User = require("../models/users.js")
const Group = require("../models/groups.js")
const Ejercise = require("../models/ejercise.js")


router.post('/',(req,res,next)=>{
  
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


router.get('/maximos',(req,res,next)=>{

  Ejercise.find({userid:req.user._id})
  .then(data=>{
    
    let records = []
    let pressBanca = [];
    let sentadilla = [];
    let pesoMuerto = [];
    let dominadas = [];
    let aerobica = [];
    let sentadillasR = []
    let flexionesR = []

    data.forEach(obj=>{

  
  if(Object.keys(obj['ejercise']) == "pressBanca" && obj['ejercise'].pressBanca[1] == 1){
      pressBanca.push(obj['ejercise'].pressBanca[0])
  }
  if(Object.keys(obj['ejercise']) == "sentadilla" && obj['ejercise'].sentadilla[1] == 1){
    sentadilla.push(obj['ejercise'].sentadilla[0])
}
if(Object.keys(obj['ejercise']) == "pesomuerto" && obj['ejercise'].pesomuerto[1] == 1){
  pesoMuerto.push(obj['ejercise'].pesomuerto[0])
}
if(Object.keys(obj['ejercise']) == "dominadas"){
  dominadas.push(obj['ejercise'].dominadas[1])
}
if(Object.keys(obj['ejercise']) == "sentadillasR"){
  sentadillasR.push(obj['ejercise'].sentadillasR[1])
}
if(Object.keys(obj['ejercise']) == "flexionesR"){
  flexionesR.push(obj['ejercise'].flexionesR[1])
}
})



    //Math.max.apply(null, pressBanca)

    records.push("Press Banca", Math.max.apply(null, pressBanca),
                  "Sentadilla",Math.max.apply(null, sentadilla),
                  "Peso muerto",Math.max.apply(null, pesoMuerto),
                  "Dominadas",Math.max.apply(null, dominadas),
                  "Sentadillas (R)",Math.max.apply(null, sentadillasR),
                  "Flexiones (R)",Math.max.apply(null, flexionesR) )

                
    res.json({maximos: records})

  })


})




module.exports = router;