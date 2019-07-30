const Project = require('../models/project-model');
const User = require('../models/user-model');
const Task = require('../models/task-model');
const logger = require('../config/winston');

/**
 * Creates a new project
 * API: add-project - Called by the POST method
 */
exports.create = (req, res) => {
    if (!req.body) {
        logger.error(`500 Project object is empty - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send({message: 'Project object is empty!'});
    }
    const project = new Project({
        project: req.body.project,
        priority: req.body.priority,
        startdt: req.body.startdt,
        enddt: req.body.enddt,
        finished: false,
    });
    project.save()
        .then(data => {
            User.updateOne({_id: req.body.manager}, {"$addToSet": {projectid: data._id}}, (err, user) => {
                if (err) {
                    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                    res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
                }                
                logger.info(`201: New project has been added - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(201).send(data); 
            });

        }).catch(err => {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
        });
}

const getcountPromise = async function (params) {
    return await Task.find(params)
}

exports.updatecount = (req, res) => {
    Project.find().then(data => { 
        for (const d of data) {                
            const countObj = getcountPromise({projectid: d._id});
            countObj.then((result) => {
                Project.updateOne({_id: d._id}, {totaltask: result.length}, (e, r)=>{
                    logger.info(`200: Updated TaskCount - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                });
            });
        }
        res.status(200).send(data);
    });
}

/**
 * Fetch all project
 * API: get-project - Called by the GET method
 */
exports.findallproject = (req, res) => {
    Project.find()
        .then(data => {            
            logger.info(`200: All project have been fetched - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(200).send(data);     
        }).catch(err => {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
        });
}

/**
 * Fetch specific project based on params id
 * API: get-project/:id - Called by the GET method
 */
exports.findproject = (req, res) => {
    Project.findById(req.params.id)
        .then(data => {
            if(!data){
                logger.info(`404: ProjectID ${req.params.id} not found - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(404).send({message: 'Project not found!'}); 
            }
            logger.info(`200: ProjectID ${req.params.id} has been fetched - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(200).send(data);
        }).catch(err => {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
        });
}

/**
 * Updates specific project
 * API: upd-project/:id - Called by the PUT method
 */
exports.updproject = (req, res) => {
    if (!req.body) {
        logger.error(`500: Project object is empty - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send({message: 'Project object is empty!'});
    }
    Project.findOne({_id: req.params.id}, (err, prj) => {
        if (err) {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
        }  
        prj.project = req.body.project;
        prj.priority = req.body.priority;
        prj.startdt = req.body.startdt;
        prj.enddt = req.body.enddt;
        prj.save();

        if (req.body.oldmanager !== "") {
            User.updateOne({_id: req.body.oldmanager}, {"$pull": {projectid: prj._id}}, (e, user) => {
                if (e) {
                    logger.error(`${e.status || 500} - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                }
            });
        }

        User.updateOne({_id: req.body.manager}, {"$addToSet": {projectid: prj._id}}, (e, user) => {
            if (e) {
                logger.error(`${e.status || 500} - ${e.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
            } 
            logger.info(`200: ProjectID ${req.params.id} has been updated - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(200).send(prj); 
        });        
    });
}

/**
 * Updates specific project
 * API: sus-project/:id - Called by the PUT method
 */
exports.suspendproject = (req, res) => {
    Project.findByIdAndUpdate(req.params.id, {finished: true}, (err, prj) =>{
        if (err) {
            logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            res.status(500).send({message: err.message || 'Error occurred during DB operation!'});
        }
        logger.info(`200: ProjectID ${req.params.id} has been suspended - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(200).send(prj); 
    });
}
