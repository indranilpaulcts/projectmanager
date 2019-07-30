const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema Task
const TaskSchema = Schema({
    taskname: String,
    priority: Number,
    parentid: { type: Schema.Types.ObjectId, refPath: 'onModel' },
    onModel: { type: String, enum: ['Parent', 'Task'] },
    projectid: { type: Schema.Types.ObjectId, required: false, ref: 'Project' },
    startdt: Date,
    enddt: Date,
    status: Boolean,
    finished: Boolean,
    running: Boolean,
});

module.exports = mongoose.model('Task', TaskSchema);
