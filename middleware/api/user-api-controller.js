const User = require('../models/user-model');
const logger = require('../config/winston');

/**
 * Creates a new user
 * API: add-user - Called by the POST method
 */
exports.create = (req, res) => {
    if (!req.body) {
        logger.error(`500 User object is empty - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send({message: 'User object is empty!'});
    }
    const user = new User({
        empid: req.body.empid,
        fname: req.body.fname,
        lname: req.body.lname,
    });
    user.save()
        .then(data => {
            logger.info(`201: New user has been added - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(201).send(data);
        }).catch(err => {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
        });
}

/**
 * Fetch all users
 * API: get-user - Called by the GET method
 */
exports.findalluser = (req, res) => {
    User.find().
        populate('projectid taskid').
        exec(function (err, data) {
            if (err) {
                logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
            }
            logger.info(`200: All users have been fetched - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(200).send(data); 
        });
}

/**
 * Fetch specific user based on params id
 * API: get-user/:id - Called by the GET method
 */
exports.finduser = (req, res) => {
    User.findById(req.params.id).
        populate('projectid taskid').
        exec(function (err, data) {
            if (err) {
                logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
            }
            if(!data){
                logger.info(`404: UserID ${req.params.id} not found - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(404).send({message: 'User not found!'}); 
            }
            logger.info(`200: UserID ${req.params.id} has been fetched - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(200).send(data);        
        });
}

/**
 * Fetch specific user based on params id
 * API: get-userbyproj/:id - Called by the GET method
 */
exports.finduserbyproj = (req, res) => {
    User.find({taskid: req.params.id}).
        populate('projectid taskid').
        exec(function (err, data) {
            if (err) {
                logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
            }
            if(!data){
                logger.info(`404: UserID ${req.params.id} not found - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(404).send({message: 'User not found!'}); 
            }
            logger.info(`200: UserID ${req.params.id} has been fetched - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(200).send(data);        
        });
}

/**
 * Updates specific user
 * API: upd-user/:id - Called by the PUT method
 */
exports.upduser = (req, res) => {
    if (!req.body) {
        logger.error(`500: User object is empty - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send({message: 'User object is empty!'});
    }
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
        }        
        logger.info(`200: UserID ${req.params.id} has been fetched - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(200).send(user); 
    });
}

/**
 * Updates specific user
 * API: del-user/:id - Called by the DELETE method
 */
exports.deluser = (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, user) => {
        if (err) {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
        }
        logger.info(`200: UserID ${req.params.id} has been deleted - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(200).send(user); 
    });
}
