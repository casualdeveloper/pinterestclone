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
    creationDate: { type: Date, required: true, default: Date.now() }
});


const noop = function() {};
userSchema.pre("save", function(done) {
    const user = this;
    if (!user.isModified("password")) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) {
            return done(err);
        }
        bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
            if (err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
});

userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
        done(err, isMatch);
    });
};

const User = mongoose.model("User", userSchema);
module.exports = User;