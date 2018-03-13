const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

const SALT_FACTOR = 10;

const userSchema = mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String, },
    email: { type: String, unique: true },
    twitter: {
        id: { type: String, unique: true },
        displayName: { type: String },
        token: { type: String },
        tokenSecret: { type: String }
    },
    pins: [{ type: Schema.Types.ObjectId, ref: "Pin" }],
    creationDate: { type: Date, required: true, default: Date.now }
});

userSchema.pre("save", function(next) {
    this.displayName = this.username || this.twitter.displayName;
    next();
});

const noop = function() {};
userSchema.pre("save", function(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
            if (err) {
                return next(err);
            }
            user.password = hashedPassword;
            next();
        });
    });
});

userSchema.methods.checkPassword = function(guess, next) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        next(err, isMatch);
    });
};

const User = mongoose.model("User", userSchema);
module.exports = User;