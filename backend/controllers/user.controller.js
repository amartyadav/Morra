import User from '../models/user.model';
import laodash from 'lodash';
import dbErrorHandler from '../helpers/dbErrorHandler';

const create = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(200).json({message: 'Successfully signed up'})
    } catch (err) {
        return res.status(400).json({error: dbErrorHandler.getErrorMessage(err)})
    }
}

const list = async (req, res) => {
    try {
        const users = await User.find().select('name email updated created');
        res.json(users);
    } catch (err) {
        return res.status(400).json({error: dbErrorHandler.getErrorMessage(err)})
    }
}

const userByID = async (req, res, next, id) => {
    try {
        const user = await User.findbyId(id);
        if (! user) 
            return res.status(400).json({error: 'User not found'})

        

        req.profile = user
        next()
    } catch (err) {
        return res.status(400).json({error: 'Could not retrieve user'})
    }
}

const read = async (req, res) => {
    req.profile.hashed_password = undefined; // remove password from response
    req.profile.salt = undefined; // remove salt from response
    return res.json(req.profile); // return user profile
}

const update = async (req, res) => {
    try {
        let user = req.profile;
        user = extend(user, req.body); // extend user object with new data
        user.updated = Date.now();
        await user.save()
        user.hashed_password = undefined; // remove password from response
        user.salt = undefined; // remove salt from response
        res.json(user);
    } catch (err) {
        return res.status(400).json({error: dbErrorHandler.getErrorMessage(err)})
    }
}

const remove = async (req, res) => {
    try {
        let user = req.profile
        let deletedUser = await user.remove()
        deletedUser.hashed_password = undefined; // remove password from response
        deletedUser.salt = undefined; // remove salt from response
        res.json(deletedUser);
    } catch (err) {
        return res.status(400).json({error: dbErrorHandler.getErrorMessage(err)})
    }
}

export default {
    create,
    list,
    userByID,
    read,
    update,
    remove
}
