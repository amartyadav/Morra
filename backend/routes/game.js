import express from 'express';
import gameCtrl from '../controllers/game.controller';

const router = express.Router();

router.route('/api/game')
    .get(gameCtrl.play)

export default router;