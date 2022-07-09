import express from 'express';
import gameCtrl from '../controllers/game.controller';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/api/game')
    .get(gameCtrl.play);

router.route('/api/game/highscores')
    .get(authCtrl.requireSignin, userCtrl.listHighScores);

router.route('/api/game/save/:user_id')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, gameCtrl.save);

router.route('/api/game/history/:user_id')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, gameCtrl.userGameHistory);

router.route('/api/game/delete/:user_id')
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, gameCtrl.deleteGame);
router.param('user_id', userCtrl.userByID);
export default router;