var express = require('express');
var router = express.Router();

/* GET conference listing. */
router.get('/', function(req, res, next) {
  res.send('conference main route');
});

module.exports = router;
