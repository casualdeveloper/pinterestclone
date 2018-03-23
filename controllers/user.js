const User = require("../models/user");

exports.addNewPin = (req, res, next) => {
    User.findById(req.user.id, (err, user) => {
        if(err) return next(err);
        if(!user){
            res.status(401).json({generalMessage:"Unauthorized"});
        }
        user.pins.push(req.pin.id);
        user.save((err) => {
            if(err) return next(err);
            return next();
        });
    });
};

exports.deletePin = (req, res, next) => {
    let pinId = req.body.pinId;

    if(!pinId)
        return res.status(422).json({generalMessage:"Failed to delete pin, please try again"});

    User.findById(req.user.id, (err, user) => {
        if(err) return next(err);

        let pinIndex = user.pins.indexOf(pinId);

        //if pin doesn't exists in current users list
        //send error since user that requested delete
        //is not owner of the pin
        if(pinIndex === -1)
            return res.status(401).json({generalMessage:"Unauthorized"});
            
        user.pins.splice(pinIndex, 1);

        user.save(err => {
            if(err) return next(err);
            return next();
        });
    });
};

exports.likePin = (req, res, next) => {
    let pinId = req.body.pinId;
    let pinOwnerId = req.body.owner._id;
    let userId = req.user.id;

    if(!pinId || !pinOwnerId || userId === pinOwnerId)
        return res.status(422).end();

    User.findById(userId, (err, user) => {
        if(err) return next(err);

        let pinIndex = user.pinned.indexOf(pinId);

        //if pinIndex is already in array
        //return error since pin has already been pinned by user
        if(pinIndex !== -1){
            return res.status(422).end();
        }

        user.pinned.splice(0,0, pinId);
        user.save(err => {
            if(err) return next(err);

            return next();
        })

    });
}

exports.unlikePin = (req, res, next) => {
    let pinId = req.body.pinId;
    let pinOwnerId = req.body.owner._id;
    let userId = req.user.id;

    if(!pinId || !pinOwnerId || userId === pinOwnerId)
        return res.status(422).end();

    User.findById(userId, (err, user) => {
        if(err) return next(err);

        let pinIndex = user.pinned.indexOf(pinId);
        
        if(pinIndex === -1){
            return res.status(422).end();
        }

        user.pinned.splice(pinIndex, 1);
        user.save(err => {
            if(err) return next(err);

            return next();
        })
    });
}