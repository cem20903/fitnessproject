const express = require('express');
const router = express.Router();
const User = require("../models/users.js")
const Group = require("../models/groups.js")
const Ejercise = require("../models/ejercise.js")
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/', ensureLoggedIn('/login'), (req, res, next) => {
  res.render('profile/info');
});

router.get('/rankings', ensureLoggedIn('/login'), (req, res, next) => {
  Group.find({ members: req.user._id })
    .then(groups => res.render('profile/rankings', { groups }))
    .catch(err => console.log(err))
});


router.get('/profile', (req, res, next) => {

  let goalWeight = req.user.goalWeight
  let weight = req.user.weight
  let actualWeight = weight[weight.length - 1].weight
  let dateActualWeight = weight[weight.length - 1].date
  res.render('profile/settings', { goalWeight: goalWeight, weight: actualWeight, dateActualWeight: dateActualWeight })
})


router.get('/iron', (req, res, next) => {


  res.render('profile/iron')


})


router.post('/iron',(req,res,next)=>{

  User.find(req.user._id)
.then(data=>{
  
  let records = data[0].records
  res.json({records:records})
})


})


router.post('/records',(req,res,next)=>{

  let id = req.user._id
  var maximos = []
  var ejercicios = ['pesomuerto']
  Ejercise.find({userid:id})
    .then(data => {


        data.forEach(entrenamiento=>{
          for(var a=0;a<ejercicios.length;a++){
            if(Object.keys(entrenamiento.ejercise) == 'pesomuerto' && entrenamiento.ejercise.pesomuerto[1] == 1){
              maximos.push('Peso muerto')
              maximos.push(entrenamiento.ejercise.pesomuerto[0])
              }
              if(Object.keys(entrenamiento.ejercise) == 'sentadilla'  && entrenamiento.ejercise.sentadilla[1] == 1){
                maximos.push('Sentadilla')
                maximos.push(entrenamiento.ejercise.sentadilla[0])
              } 

              if(Object.keys(entrenamiento.ejercise) == 'pressBanca'  && entrenamiento.ejercise.pressBanca[1] == 1){
                maximos.push('Press banca')
                maximos.push(entrenamiento.ejercise.pressBanca[0])
              }
              if(Object.keys(entrenamiento.ejercise) == 'pressMilitar'  && entrenamiento.ejercise.pressMilitar[1] == 1){
                maximos.push('Press militar')
                maximos.push(entrenamiento.ejercise.pressMilitar[0])
              }

          }
        })


res.json({maximos: maximos})

      
    })


})

router.post('/update', (req, res, next) => {

  var d = new Date();
d = d.getFullYear() 
+ "-" + ('0' + (d.getMonth() + 1)).slice(-2)
+ "-" + ('0' + d.getDate()).slice(-2);

let weight = +req.body.weight
let goalWeight = +req.body.goalWeight


  User.findByIdAndUpdate(req.user._id,{goalWeight:goalWeight})
    .then((data) => {
      User.findByIdAndUpdate(req.user._id,{$push: {weight:{date:d,weight:weight}}})
      .then(data=>{

     
        let weight = data.weight[data.weight.length-1].weight
        let genre = data.genre
        var iron = []

        if(genre === "male"){
          iron = [+weight,10,weight*0.75,weight*1.8,weight*1.5,200,200,15,25,75,20]
         } else {
          iron = [weight*0.5,8,weight*0.35,weight*1.2,weight*0.9,200,200,18,30,75,20]
    
         }

          User.findByIdAndUpdate(req.user._id,{"records.iron":iron})
          .then(data=>{

            res.redirect('profile')
          })
          .catch(err=>console.log(err))

        

      })

      
    })

})





router.get("/searchRanKing", (req, res, next) => {
  let findId = {}
  let sort1 = `ejercise.${req.query.type}.0`
  if (req.query && req.query.id != "global") findId = { groups: req.query.id }
  User.find(findId)
    .then(users => {
      const arrUsers = users.map(elem => elem._id)
      let findE = `ejercise.${req.query.type}`
      let resArr = [];
      Ejercise.find({ $and: [{ userid: { $in: arrUsers } }, { [findE]: { $exists: true } }] }, {}, { sort: { [sort1]: -1 } })
        .then(ejer => {
          let checkIds = []
          ejer.forEach(elem => {
            if (checkIds.indexOf(elem.userid) == -1 && elem.ejercise[req.query.type][1] == 1) {
              for (var j = 0; j < users.length; j++) {
                if (users[j]._id == elem.userid) {
                  checkIds.push(elem.userid)
                  resArr.push({ name: users[j].username, userId: elem.userid, ejer: elem.ejercise[req.query.type] })
                }
              }
            }
          })
          res.json(resArr);
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/evolution', (req, res, next) => {

  res.render('profile/evolution')
})

module.exports = router;