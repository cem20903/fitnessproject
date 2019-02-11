const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => {
  console.log(req.user)
  res.render('profile/info');
});

module.exports = router;