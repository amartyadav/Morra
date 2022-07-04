const play = async (req, res) => {
    try {
        let guess = Math.floor(Math.random() * 10) + 1;
        let fingers = Math.floor(Math.random() * 20) + 1;
        return res.status(200).json({guess: guess, fingers: fingers});
    }
    catch (err) {
        return res.status(400).json({error: 'Could not play the chance. Try again.'});
    }
}

export default {
    play
}