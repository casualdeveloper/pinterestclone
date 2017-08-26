const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const config = require("./config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("./models/user");

const jwtOptions = {  
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.JWT_SECRET
};

const localLogin = new LocalStrategy(function(username, password, done) {  
    User.findOne({ username: username }, function(err, user) {
        if(err) { return done(err); }
        if(!user) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

        user.checkPassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

            return done(null, user);
        });
    });
});

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {  
    User.findById(payload.id, function(err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

const jwtVerify = new JwtStrategy(jwtOptions, function(payload, done) {
    const userId = payload.id;
    done(null, userId);
});

passport.use("jwtVerify", jwtVerify);
passport.use(jwtLogin); 
passport.use(localLogin);

