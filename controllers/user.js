const User = require("../models/user");

exports.addNewPin = (req, res, next) => {
    User.findById(req.user.id, (err, user) => {
        if(err) return next(err);
        if(!user){
            res.status(401).json({error:"Unauthorized"});
        }
        user.pins.push(req.pin.id);
        user.save((err, user) => {
            if(err) return next(err);
            return next();
        });
    });
}

exports.deletePin = (req, res, next) => {
    let pinId = req.body.pinId;

    if(!pinId)
        res.status(422).json({error:"Inavlid pin id!"});

    User.findById(req.user.id, (err, user) => {
        if(err) return next(err);

        let pinIndex = user.pins.indexOf(pinId);

        //if pin doesn't exists in current users list
        //send error since user that requested delete
        //is not owner of the pin
        if(pinIndex === -1)
            return res.status(401).json({error:"Unauthorized"});
            
        user.splice(pinIndex, 1);

        user.save(err => {
            if(err) return next(err);
            return next();
        });
    });
}