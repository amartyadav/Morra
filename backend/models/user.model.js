import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: "Email is required",
        trim: true,
        index: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },

    name: {
        type: String,
        required: "Name is required",
        trim: true

    },

    hashed_password: {
        type: String,
        required: "Password is required"
    },

    salt: String,

    updated: {
        type: Date,
        default: Date.now
    }
})

userSchema.virtual("password").set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function () {
    return this._password;
});

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if(!password) return "";
        try {
            return crypto.createHmac("sha256", this.salt)
                .update(password)
                .digest("hex")
        } catch (err) {
            return "";
        }
},
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    }
}

userSchema.path("hashed_password").validate(function (v) {
    if(this._password && this._password.length < 6) {
        this.invalidate("password", "Password must be at least 6 characters.")
    }
    if(this.isNew && !this._password) {
        this.invalidate("password", "Password is required.")
    }
}, null);