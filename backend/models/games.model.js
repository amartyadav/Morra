import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: "userId is required",
        trim: true
    },
    userName: {
        type: String,
        required: "userName is required",
        trim: true
    },
    botScore: {
        type: Number,
        default: 0
    },
    yourScore: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
}, {collection: "games"});

const gameModel = mongoose.model("game", gameSchema);
gameModel.createIndexes();
export default gameModel;