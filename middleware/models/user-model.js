const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema User
const UserSchema = Schema({
    fname: String,
    lname: String,
    empid: String,
    projectid: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    taskid: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

module.exports = mongoose.model('User', UserSchema);