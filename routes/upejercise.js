const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/upejercise', (req, res, next) => {
  res.render('ejercise/uptrain')
});

router.use('/', require('./auth'));

module.exports = router;
