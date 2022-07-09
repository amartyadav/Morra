import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
require('dotenv').config();

const signin = async (req, res) => {
    console.log(req.user)
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({
                message: 'User not found'
            })
        }
        if (!user.authenticate(req.body.password)) {
            return res.status(401).json({
                message: 'Email and password do not match'
            })
        }

        let token = jwt.sign({
            _id: user._id,
        }, process.env.JWT_SECRET)

        res.cookie('t', token, { expire: new Date() + 9999 })

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                highScore: user.highScore,
            }
        })
    } catch (err) {
        return res.status(401).json({
            message: 'Could not sign in. Please try again'
        })
    }
}

const signout = (req, res) => {
    res.clearCookie('t')
    return res.json({
        message: 'Signout successful'
    })
}

const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: [ 'HS256' ]
})

const hasAuthorization = (req, res, next) => {
    const authorised = req.profile && req.auth && req.profile._id == req.auth._id
    if (!authorised) {
        return res.status(403).json({
            message: 'User is not authorized'
        })
    }
    next()
}

const isAdmin = (req, res, next) => {
    console.log(req.user)
    if (req.profile.userType != 'admin') {
        return res.status(403).json({
            message: 'User is not admin'
        })
    }
    next()
}


export default {
    signin,
    signout,
    requireSignin,
    hasAuthorization,
    isAdmin
}
