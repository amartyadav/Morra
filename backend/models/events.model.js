import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",
        trim: true
    },
    description: {
        type: String,
        required: "Description is required",
        trim: true
    },
    date: {
        type: Date,
        required: "Date is required"
    },
    location: {
        type: String,
        required: "Location is required",
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
}, {collection: "events"});

const eventModel = mongoose.model("Event", eventSchema);
eventModel.createIndexes();
export default eventModel;