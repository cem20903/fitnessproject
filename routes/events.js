const express = require('express');
const router  = express.Router();
const axios = require("axios")
    
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('events');
});
router.get('/axios', (req, res, next) => {
  axios.get("http://api.amp.active.com/v2/search/?city=Madrid&country=Spain&current_page=1&per_page=5&sort=distance&exclude_children=true&api_key=c7bpju5t7dfhacsvx62mbj4z", { headers: {'Access-Control-Allow-Origin': "http://www.active.com"}})
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
