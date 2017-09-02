const Pin = require("../models/pin");
const User = require("../models/user");

exports.new = (req, res, next) => {
    let data = {
        url: req.body.url,
        title: req.body.title,
        description: req.body.description,
        owner: req.user.id
    }

    Pin.create(data, (err, pin) => {
        if(err) return next(err);
        req.pin = pin;
        return next();
    });
}
//should be called after deleting from users pin list
//when calling delete function from users controller
//it checks if user is owner of the pi nand only then proceeds
//so if request came to this middleware it means
//user is owner of the pin and we don't have to worry about it.
exports.delete = function(req, res, next){
    let pinId = req.body.pinId;
    if(!pinId) return res.status(422).json({error:"Inavlid pin id!"});
    
    Pin.findByIdAndRemove(pinId, err => {
        if(err) return next(err);
        return next();
    });
}
