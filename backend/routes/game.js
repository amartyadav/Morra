import express from 'express';
import gameCtrl from '../controllers/game.controller';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/api/game')
    .get(gameCtrl.play);

router.route('/api/game/save/:user_id')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, gameCtrl.save);

router.param('user_id', userCtrl.userByID);
export default router;