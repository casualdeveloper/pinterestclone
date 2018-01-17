const Strategy = require("passport-strategy");

class TwitterStrategy extends Strategy {
    constructor(options, done) {
        super(this);
        this.consumerKey = options.consumerKey;
        this.consumerSecret = options.consumerSecret;
        this.callbackURL = options.callbackURL;

    }
    authenticate(req, options) {
        
    }
}