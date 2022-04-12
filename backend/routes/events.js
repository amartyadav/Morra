import express from 'express';
import eventCtrl from '../controllers/events.controller';
import authCtrl from '../controllers/auth.controller';
const router = express.Router();

router.route('/api/events')
  // .get(eventCtrl.list)
  // .post(authCtrl.requireSignin, authCtrl.userType, eventCtrl.create)
  // .put(authCtrl.requireSignin, authCtrl.userType, eventCtrl.update)
  // .delete(authCtrl.requireSignin, authCtrl.userType, eventCtrl.remove);

export default router;