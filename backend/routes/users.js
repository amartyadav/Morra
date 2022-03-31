var express = require('express');
var router = express.Router();
var userCtrl = require('./../controllers/user.controller');

/* GET users listing. */
router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create);

router.route('/api/users/:user_id')
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

router.param('user_id', userCtrl.userByID);
module.exports = router;
