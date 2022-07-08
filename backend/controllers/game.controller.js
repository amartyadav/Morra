import Game from '../models/games.model';
import dbErrorHandler from '../helpers/dbErrorHandler';

const play = async (req, res) => {
    try {
        let guess = Math.floor(Math.random() * 20) + 1;
        let fingers = Math.floor(Math.random() * 10) + 1;
        return res.status(200).json({guess: guess, fingers: fingers});
    }
    catch (err) {
        return res.status(400).json({error: 'Could not play the chance. Try again.'});
    }
}

const save = async (req, res) => {
    const game = new Game(req.body);
    try {
        await game.save();
        return res.status(200).json({message: 'Game saved successfully'});
    }
    catch (err) {
        return res.status(400).json({error: dbErrorHandler.getErrorMessage(err)});
    }
}

const userGameHistory = async (req, res) => {
    try {
        const user_id = req.params.user_id
        //const userId = req.body.id;
        const games = await Game.find({userId: user_id});
        return res.status(200).json(games);
    }
    catch (err) {
        return res.status(400).json({error: err});
    }
}

const deleteGame = async (req, res) => {
    try {
        const user_id = req.params.user_id
        await Game.remove({userId: user_id});
        return res.status(200).json({message: 'Game records deleted successfully'});
    }
    catch (err) {
        return res.status(400).json({error: dbErrorHandler.getErrorMessage(err)});
    }
}

export default {
    play,
    save,
    userGameHistory,
    deleteGame
}