const express = require('express');
const router  = express.Router();
const ejerciseModel = require("../models/ejercise")
const User = require("../models/users.js")

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/upejercise',ensureLoggedIn('/login'), (req, res, next) => {
  res.render('ejercise/uptrain')
});

router.post('/add-train',ensureLoggedIn('/login'),(req,res,next)=>{
  let array = []
  const ejercises = req.body

  for (const nom in ejercises) {

    
    //Al nombre le quito el numero
    let nombre = nom.replace(/[0-9]/g, '');
    if(nombre == "aerobica"){
// tiempo
if(ejercises[nom][0].indexOf(":") != -1){

  ejercises[nom][0] = +ejercises[nom][0].replace(":",".")
  ejercises[nom][1] = +ejercises[nom][1]
 console.log(ejercises[nom])
    }
  }
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
