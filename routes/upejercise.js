const express = require('express');
const router = express.Router();
const ejerciseModel = require("../models/ejercise")
const User = require("../models/users.js")
const Ejercise = require("../models/ejercise.js")

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/upejercise', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('ejercise/uptrain')
});

router.post('/add-train', ensureLoggedIn('/login'), (req, res, next) => {
  let array = []
  const ejercises = req.body

  for (const nom in ejercises) {
//Revisar
    //let nombre = nom.replace(/[0-9]/g, '');
    let nombre = nom
    console.log(nom)
    if (nombre == "aerobica") {
      if (ejercises[nom][0].indexOf(":") != -1) {

        ejercises[nom][0] = parseInt(ejercises[nom][0].replace(":", "."))
        ejercises[nom][1] = parseInt(ejercises[nom][1])
      }

    } else {
      
      ejercises[nom][0] = +ejercises[nom][0]
      ejercises[nom][1] = +ejercises[nom][1]
    }
    array.push({ userid: req.user.id, ejercise: { [nombre]: ejercises[nom] }, date: req.body.date })

  }

  ejerciseModel.insertMany(array)
    .then((ejercises) => {
      const arrEj = ejercises.map(elem => elem._id)

      User.findByIdAndUpdate(req.user._id, { $push: { ejercise: { $each: arrEj } } })
        .then(user => {

          let message = "Entrenamiento subido con exito"
          
        let weight = user.weight
        let actualWeight = weight[weight.length - 1].weight

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
            records.push(Math.max.apply(null, pressBanca), 
                         Math.max.apply(null, dominadas),
                          0,
                          Math.max.apply(null, pesoMuerto),
                          Math.max.apply(null, sentadilla),
                          Math.max.apply(null, sentadillasR),
                          Math.max.apply(null, flexionesR),
                          0,
                          0,
                          actualWeight,
                          0,
                          )
                 

     User.findByIdAndUpdate(req.user._id,{"records.personal":records})
     
     .then(data=>{

       res.render('profile/info', { message })
     })
 
          })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router;
