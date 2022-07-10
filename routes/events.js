import express from 'express';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';
import eventCtrl from '../controllers/events.controller';

const router = express.Router();

router.route('/api/events')
    .get(eventCtrl.listEvents);

router.route('/api/events/create/:user_id')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, authCtrl.isAdmin, eventCtrl.create)
    
// router.route('/api/events/delete/:event_id/:user_id')
//     .delete(authCtrl.requireSignin, authCtrl.isAdmin, eventCtrl.remove)

router.param('user_id', userCtrl.userByID);

export default router;