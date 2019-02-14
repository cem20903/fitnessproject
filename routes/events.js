require("dotenv").config()
const express = require('express');
const router  = express.Router();
const axios = require("axios")
    
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('events', {key:process.env.ROUTE_HEROKU});
});
router.get('/axios', (req, res, next) => {
  axios.get("http://api.amp.active.com/v2/search/?city="+req.query.city+"&country="+req.query.country+"&current_page=1&per_page=5&sort=distance&exclude_children=true&api_key="+process.env.ACCESSTOKEN, { headers: {'Access-Control-Allow-Origin': "http://www.active.com"}})
    .then(data => {
      const dataArr = [];
      data.data.results.forEach(elem => {
        dataArr.push({logo: elem.logoUrlAdr, dir: elem.place.addressLine1Txt, name: elem.place.placeName, date: elem.activityStartDate})
      })
      res.json(dataArr)
    })
    .catch(err => console.log(err))
});


module.exports = router;
