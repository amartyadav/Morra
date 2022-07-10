import Event from "../models/events.model";
import dbErrorHandler from "../helpers/dbErrorHandler";

const create = async (req, res) => {
    const event = new Event(req.body);
    try {
        await event.save();
        return res.status(200).json({message: "Successfully created event"});
    } catch (err) {
        return res.status(400).json({error: dbErrorHandler.getErrorMessage(err)});
    }
}

const listEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({date: -1}).select("-__v");
        res.json(events);
    } catch (err) {
        return res.status(400).json({error: dbErrorHandler.getErrorMessage(err)})
    }
}

const remove = async (req, res) => {
    try {
        let event = req.event;
        await event.remove();
        res.json(event);
    } catch (err) {
        return res.status(400).json({error: dbErrorHandler.getErrorMessage(err)});
    }
}

export default {
    create,
    listEvents,
    remove
}