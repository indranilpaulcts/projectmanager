const Parent = require('../models/parent-model');
const logger = require('../config/winston');

/**
 * Fetch all parents 
 * API: get-parent/ - Called by the GET method
 */
exports.findallparent = (req, res) => {
    Parent.find()
        .then(parent => {
            logger.info(`200: All parents have been fetched - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(200).send(parent); 
        }).catch(err => {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
        });
}

/**
 * Creates a new task
 * API: add-task - Called by the POST method
 */
exports.create = (req, res) => {
    if (!req.body) {
        logger.error(`500: Task object is empty - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send({message: 'Task object is empty!'});
    }
    const parent = new Parent({
        taskname: req.body.taskname,        
    });
    parent.save()
        .then(data => {
            logger.info(`201: New Task has been added - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(201).send(data); 
        }).catch(err => {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
        });
}

/**
 * Updates specific task
 * API: upd-parent/:id - Called by the PUT method
 */
exports.updparent = (req, res) => {
    if (!req.body) {
        logger.error(`500: Parent object is empty - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send({message: 'Parent object is empty!'});
    }
    Parent.findByIdAndUpdate(req.params.id, req.body, (err, parent) => {
        if (err) {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
        }
        logger.info(`200: ParentID ${req.params.id} has been fetched - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(200).send(parent);
    });
}
