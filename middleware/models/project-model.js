const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema Project
const ProjectSchema = Schema({
    project: String,
    priority: Number,
    startdt: Date,
    enddt: Date,
    finished: Boolean,
    totaltask: Number,
});

module.exports = mongoose.model('Project', ProjectSchema);