const Task = require('../models/task-model');
const User = require('../models/user-model');
const logger = require('../config/winston');

/**
 * Creates a new task
 * API: add-task - Called by the POST method
 */
exports.create = (req, res) => {
    if (!req.body) {
        logger.error(`500: Task object is empty - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send({message: 'Task object is empty!'});
    }
    const task = new Task({
        taskname: req.body.taskname,        
        status: req.body.status,
        startdt: req.body.startdt,
        enddt: req.body.enddt,
        priority: req.body.priority,
        finished: false,        
        running: false,
        parentid: req.body.parentid,        
        onModel: req.body.onModel,
        projectid: req.body.projectid,
    }); 
    task.save()
        .then(data => {
            User.updateOne({_id: req.body.userid}, {"$addToSet": {taskid: data._id}}, (err, user) => {
                if(err) {
                    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                    res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
                }
                logger.info(`201: New Task has been added - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(201).send(data); 
            });           
        }).catch(err => {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
        });
}

/**
 * Fetch all tasks
 * API: get-task - Called by the GET method
 */
exports.findall = (req, res) => {   
    Task.find()
        .populate('parentid projectid')
        .exec((err, task) => {
            if (err) {
                logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(500).send({message: err.message || 'Error occurred during DB operation!'});    
            }
            for (var i = 0; i < task.length; i++) {
                if (task[i].startdt <= new Date() && task[i].enddt >= new Date()) { 
                    task[i].running = true;              
                    task[i].finished = false;
                }
                if (task[i].enddt < new Date()) {
                    task[i].running = false;
                    task[i].finished = true;
                }
                Task.updateOne({_id: task[i]._id}, {running: task[i].running, finished: task[i].finished}, (err, t) => {           
                    if(err){
                        logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                    }
                });
            }
            logger.info(`200: All records have been fetched - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(200).send(task); 
        });
}

/**
 * Fetch specific tasks based on params id
 * API: get-task/:id - Called by the GET method
 */
exports.find = (req, res) => {
    Task.find({_id: req.params.id})
        .populate('parentid projectid')
        .exec((err, task) => {
            if (err) {
                logger.info(`404: TaskID ${req.params.id} not found - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(404).send({message: 'Task not found!'}); 
            }
            logger.info(`200: TaskID ${req.params.id} has been fetched - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(200).send(task); 
        });
}

/**
 * Updates specific task
 * API: upd-task/:id - Called by the PUT method
 */
exports.updtask = (req, res) => {
    if (!req.body) {
        logger.error(`500: Task object is empty - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send({message: 'Task object is empty!'});
    }
    Task.findByIdAndUpdate(req.params.id, req.body, (err, task) => {
        if (err) {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
        }
        if (req.body.olduser != req.body.userid){
            User.updateOne({_id: req.body.olduser}, {"$pull": {taskid: task._id}}, (e, user) => {
                if (e) {
                    logger.error(`${e.status || 500} - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                }
            });
            User.updateOne({_id: req.body.userid}, {"$addToSet": {taskid: task._id}}, (err, user) => {
                if(err) {
                    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                }
            });
        }               
        logger.info(`200: TaskID ${req.params.id} has been updated - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(200).send(task); 
    });
}
