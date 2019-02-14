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
router.use('/events', require('./events'));
router.use('/',require('./evolution'))

module.exports = router;
