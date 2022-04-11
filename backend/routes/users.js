//var express = require('express');

//var userCtrl = require('./../controllers/user.controller');

import express from 'express';
import userCtrl from '../controllers/user.controller';
const router = express.Router();

/* GET users listing. */
router.route('/api/users')
  .get(userCtrl.list)
  .post(userCtrl.create);

router.route('/api/users/:user_id')
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

router.param('user_id', userCtrl.userByID);
export default router;
//module.exports = router;
