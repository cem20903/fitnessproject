const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.redirect('/login');
});

router.use('/', require('./auth'));
router.use('/', require('./upejercise'));
router.use('/profile', require('./profile'));
router.use('/group', require('./groups'));
router.use('/',require('./evolution'))
router.use('/training',require('./training'))

module.exports = router;
