import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: "userName is required",
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: "description is required",
    },
    venue: {
        type: String,
        trim: true,
        required: "venue is required",
    },
    date: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String,
        trim: true,
        required: "time is required",
    },
}, {collection: "events"});

const eventModel = mongoose.model("Event", eventSchema);
eventModel.createIndexes();
export default eventModel;